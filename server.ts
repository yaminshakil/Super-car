import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { CARS_DATABASE } from './src/data/cars';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client safely
// Keep it lazy/safe so it won't crash if key is missing during startup, but we check when calling
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', carsCount: CARS_DATABASE.length });
});

// Fetch list of cars (useful if backend controls data)
app.get('/api/cars', (req: Request, res: Response) => {
  res.json(CARS_DATABASE);
});

// AI chat handler
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const client = getGeminiClient();

    // Context format for the system instruction
    const carsContext = CARS_DATABASE.map(car => {
      return `Car: ${car.brand} ${car.name} (${car.year})
Origin: ${car.origin}
Price: $${car.price.toLocaleString()}
Category: ${car.category}
Rarity limit: Only ${car.specs.productionLimit} produced
Specs:
- Engine: ${car.specs.engine} (${car.specs.displacement})
- Horsepower: ${car.specs.power} HP
- Torque: ${car.specs.torque} lb-ft
- Redline: ${car.specs.redline} RPM
- Transmission: ${car.specs.transmission}
- Drivetrain: ${car.specs.drivetrain}
- 0-60 mph: ${car.specs.zeroToSixty}s
- Top speed: ${car.specs.topSpeed} mph
- Weight: ${car.specs.weight} lbs
- Power-to-weight: ${car.specs.powerToWeight}
- Chassis: ${car.specs.chassis}
- Brakes: ${car.specs.brakes}
Overview: ${car.overview}
Engineering Highlight: ${car.engineeringHighlight}
`;
    }).join('\n---\n');

    const systemInstruction = `You are "The Gearhead AI", an expert mechanical engineer, seasoned automotive journalist, and elite hypercar consultant. 
You are hosting an interactive conversation in the garage of our high-end supercar spec website.
Your tone is professional, technical, deeply enthusiast-oriented, and highly analytical. Avoid fluffy marketing speak; talk like an engineer who respects pure mechanical craft, drag coefficients, tire compounds, thermal efficiency, and transmission shift speeds.

You have access to our core hypercar catalog:
${carsContext}

Rule:
1. Always base your comparisons on the real specifications of the cars in our catalog if asked about them.
2. If the user asks about general performance engineering concepts (like turbo lag, double-wishbone suspension, dry-sump lubrication, carbon-ceramic brakes, or active aerodynamics), answer with expert-level mechanical engineering detail.
3. If they ask about drag races or acceleration matches, feel free to analyze torque curves, power-to-weight ratios, traction/drivetrains, and predict a scientifically backed winner.
4. Keep formatting clean and use Markdown (bold, lists, headers, code snippets) for scannable, elegant text. Always sound incredibly passionate and knowledgeable about luxury hypercars.`;

    // Map the incoming message thread to Gemini format
    // We'll translate roles: 'user' -> 'user', 'assistant' -> 'model'
    const contents = messages.map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({ error: error.message || 'An error occurred during generation' });
  }
});

// Compare vehicles analysis endpoint
app.post('/api/compare-analysis', async (req: Request, res: Response) => {
  try {
    const { carIds } = req.body;
    if (!carIds || !Array.isArray(carIds) || carIds.length < 2) {
      return res.status(400).json({ error: 'Provide at least two car IDs for comparison' });
    }

    const selectedCars = CARS_DATABASE.filter(car => carIds.includes(car.id));
    if (selectedCars.length < 2) {
      return res.status(404).json({ error: 'Selected cars not found in database' });
    }

    const client = getGeminiClient();

    const comparisonText = selectedCars.map(car => `
Name: ${car.brand} ${car.name}
Engine: ${car.specs.engine} (${car.specs.displacement})
Output: ${car.specs.power} HP / ${car.specs.torque} lb-ft
Weight: ${car.specs.weight} lbs
Top Speed: ${car.specs.topSpeed} mph
0-60: ${car.specs.zeroToSixty} seconds
Price: $${car.price.toLocaleString()}
Drivetrain: ${car.specs.drivetrain}
Transmission: ${car.specs.transmission}
Chassis: ${car.specs.chassis}
Overview: ${car.overview}
Engineering Highlight: ${car.engineeringHighlight}
`).join('\n---\n');

    const prompt = `Write an elite technical editorial piece comparing these hypercars:
${comparisonText}

Your article should include:
1. **Dynamic Aerodynamics & Weight**: A side-by-side analysis of their chassis engineering, mass, and how they manipulate airflow.
2. **Powertrain Philosophy**: A comparison of their engine architectures (e.g., V16 Hybrid vs. Flat-plane twin-turbo V8 vs. classic heavy V12s).
3. **The Quarter-Mile and V-Max Verdict**: A detailed, scientifically reasoned simulation/prediction of who wins in a quarter-mile drag race and who dominates top-speed runs (V-Max), highlighting variables like tire traction, gearing, and downforce.
4. **Collector Value & Rarity**: A brief note on their market tier and exclusivity.

Be highly detailed, engaging, and write in the style of an elite print automotive magazine (e.g., Evo, Car and Driver, or MotorTrend). Use rich formatting, bold headers, and structured bullet lists.`;

    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        temperature: 0.6,
      }
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error('Gemini comparison analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate comparison analysis' });
  }
});

// -------------------------------------------------------------
// Vite Dev Server / Production Serving
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production build from dist/');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
