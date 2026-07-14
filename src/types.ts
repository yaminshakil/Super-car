export interface CarSpecs {
  engine: string;
  displacement: string;
  power: number; // HP
  torque: number; // lb-ft
  redline: number; // RPM
  transmission: string;
  drivetrain: string;
  zeroToSixty: number; // seconds
  topSpeed: number; // mph
  weight: number; // lbs
  powerToWeight: string;
  chassis: string;
  brakes: string;
  productionLimit: number;
}

export interface BlogArticle {
  title: string;
  content: string;
  publishDate: string;
  author: string;
  readTime: string;
}

export interface CarData {
  id: string;
  name: string;
  brand: string;
  price: number; // USD
  year: number;
  origin: string;
  image: string;
  gallery: string[];
  category: 'hypercar' | 'grand-tourer' | 'track-weapon' | 'coachbuilt';
  specs: CarSpecs;
  overview: string;
  engineeringHighlight: string;
  article: BlogArticle;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface TelemetryData {
  time: number; // seconds
  speed: number; // mph
  distance: number; // feet
}

export interface SimulationResult {
  car1: CarData;
  car2: CarData;
  winner: CarData;
  car1Telemetry: TelemetryData[];
  car2Telemetry: TelemetryData[];
  car1Time: number; // quarter-mile time
  car2Time: number; // quarter-mile time
  commentary: string[];
}
