import { CarData } from '../types';

export const CARS_SPECS_DATABASE: CarData[] = [
  {
    id: 'bugatti-tourbillon',
    name: 'Tourbillon',
    brand: 'Bugatti',
    price: 4300000,
    year: 2026,
    origin: 'France',
    image: '/images/bugatti_tourbillon_1784039418756.jpg',
    gallery: [
      '/images/bugatti_tourbillon_1784039418756.jpg',
      'https://images.unsplash.com/photo-1600706432502-75a0e2e21eed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'hypercar',
    specs: {
      engine: 'Cosworth-designed Naturally Aspirated V16 + 3 Electric Motors',
      displacement: '8.3 Liters',
      power: 1800,
      torque: 1475,
      redline: 9000,
      transmission: '8-Speed Dual-Clutch Longitudinal',
      drivetrain: 'All-Wheel Drive (Electric Front, Hybrid Rear)',
      zeroToSixty: 2.0,
      topSpeed: 277,
      weight: 4398,
      powerToWeight: '818 HP/ton',
      chassis: 'Next-Gen Carbon Fiber Monocoque & T800 Carbon Composite',
      brakes: 'Carbon Ceramic Discs, 6-Piston Front / 4-Piston Rear Monobloc',
      productionLimit: 250
    },
    overview: 'The Bugatti Tourbillon represents an epochal shift. Bidding farewell to the legendary quad-turbo W16, Bugatti has engineered a clean-sheet 8.3L naturally aspirated V16 in partnership with Cosworth, paired with three electric motors. The result is an 1800-horsepower masterpiece that blends historic mechanical purity with cutting-edge electrification.',
    engineeringHighlight: 'The Cosworth V16 engine is a work of mechanical art. Measuring nearly a meter long, it weighs just 555 lbs despite its massive displacement, revving to 9,000 RPM without any forced induction. The instrument cluster is a literal horological masterpiece—crafted by Swiss watchmakers, containing over 600 titanium parts, rubies, and sapphires, with Swiss-tolerance gears visible behind a sapphire crystal.',
    article: {
      title: 'Chronomitry of Speed: Inside Bugatti’s 1,800-HP V16 Masterpiece',
      publishDate: 'July 12, 2026',
      author: 'Alistair Vance',
      readTime: '6 min read',
      content: `The automotive world stood still when Bugatti announced they would retire the quad-turbo W16 engine. How could you replace the defining powertrain of 21st-century hypercars? The answer is the Tourbillon.\n\nInstead of turning to a downsized, heavily turbocharged V8 or V6, Bugatti did the unthinkable: they built a naturally aspirated 8.3-liter V16 engine that revs to a glorious 9,000 RPM. Engineered in partnership with Cosworth, this internal combustion engine alone produces 1,000 horsepower and 664 lb-ft of torque, screaming with an intake howl reminiscent of 1990s Formula 1 cars.\n\n### The Hybrid Integration\nTo supplement the low-end torque of a naturally aspirated engine, Bugatti integrated three electric motors powered by a 25 kWh liquid-cooled 800V battery pack. Two motors sit on the front axle, providing full torque vectoring, while the third motor is integrated directly into the rear longitudinal dual-clutch transmission.\n\nThis hybrid setup contributes an additional 800 horsepower, pushing the combined output to 1,800 HP. In an era where hybrid supercars struggle with weight, the Tourbillon weighs *less* than the Chiron it replaces, coming in at under 4,400 lbs thanks to an ultra-lightweight carbon monocoque chassis where the battery pack is integrated into the crash structure.\n\n### Horological Masterpiece in the Cockpit\nThe name "Tourbillon" is a direct nod to watchmaking, specifically the mechanical cage that counters the effects of gravity on a watch's accuracy. This philosophy is embodied in the cockpit.\n\nThe steering wheel features a fixed-hub design: the center console remains completely static, while the rim rotates around it. Mounted to this static hub is a completely mechanical, analog instrument cluster built by Swiss watchmakers. Crafted with watch-grade tolerances (to five microns), the titanium dials feature sapphire glass and active mechanical gears. Even the needles are counter-weighted and move with sweeping mechanical precision, completely eschewing the modern trend of laggy, generic digital screens.\n\nThis is an analog, mechanical monument built to stand the test of centuries.`
    }
  },
  {
    id: 'koenigsegg-jesko-absolut',
    name: 'Jesko Absolut',
    brand: 'Koenigsegg',
    price: 3400000,
    year: 2025,
    origin: 'Sweden',
    image: '/images/koenigsegg_jesko_1784039446820.jpg',
    gallery: [
      '/images/koenigsegg_jesko_1784039446820.jpg',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'hypercar',
    specs: {
      engine: 'Twin-Turbocharged 5.0L Flat-Plane Crank V8',
      displacement: '5.0 Liters',
      power: 1600,
      torque: 1106,
      redline: 8500,
      transmission: '9-Speed Light Speed Transmission (LST) with 7 Clutches',
      drivetrain: 'Rear-Wheel Drive with Electronic Differential',
      zeroToSixty: 2.5,
      topSpeed: 330,
      weight: 3064,
      powerToWeight: '1044 HP/ton',
      chassis: 'Carbon Fiber Monocoque with Kevlar Reinforcements',
      brakes: 'Ventilated Ceramic Discs, 6-Piston Front / 4-Piston Rear calipers',
      productionLimit: 125
    },
    overview: 'The Jesko Absolut is Koenigsegg’s ultimate expression of high-speed aerodynamics. Designed to be the fastest car Koenigsegg will ever build, the Absolut features a mind-boggling drag coefficient of just 0.278 Cd. Powering this missile is a flat-plane twin-turbo V8 generating up to 1,600 horsepower, mated to a multi-clutch transmission that can shift gears in virtually zero time.',
    engineeringHighlight: 'The Light Speed Transmission (LST) is a mechanical revolution. Traditional dual-clutch gearboxes must predict the next gear and can only shift sequentially without heavy penalties. The Koenigsegg LST uses nine gears and seven wet multi-disc clutches, allowing it to jump from 9th gear directly to 5th gear in just two milliseconds, a technology Koenigsegg calls Ultimate Power On Demand (UPOD).',
    article: {
      title: 'Breaking Physics: The Aerodynamic Wizardry of the Jesko Absolut',
      publishDate: 'June 29, 2025',
      author: 'Christian S.',
      readTime: '5 min read',
      content: `How fast is too fast? When Christian von Koenigsegg declared that the Jesko Absolut would be the fastest car the Swedish manufacturer would ever build, he wasn't exaggerating. The vehicle is engineered to reach theoretical speeds of up to 330 mph. But building a car that can survive those speeds is not a matter of horsepower—it is a battle against the air itself.\n\n### Aerodynamics of the Absolut\nWhile the track-focused Jesko "Attack" features a massive, active double-profile rear wing designed to generate over 3,000 lbs of downforce, the Absolut is the exact opposite. It is designed to slip through the air with as little drag as possible.\n\nThe large rear wing is gone, replaced by two fighter-jet-style rear fins designed to stabilize the car at extreme velocities. The rear bodywork is extended by 85 mm (3.3 inches) to streamline the trailing wake, and the rear wheels feature flat carbon-fiber covers to prevent air turbulence inside the wheel arches. Through hundreds of hours of computational fluid dynamics (CFD) simulation, Koenigsegg achieved a drag coefficient of just 0.278 Cd.\n\n### The 1,600 Horsepower Heart\nNestled in the carbon monocoque is a 5.0-liter flat-plane crank twin-turbo V8. When running on standard 95-octane pump gasoline, it produces a stout 1,280 HP. Fill the tank with E85 biofuel, however, and the flat-plane crank sings a different tune, unlocking 1,600 horsepower and 1,106 lb-ft of torque.\n\nTo eliminate turbo lag, Koenigsegg engineered a patented air-injection system. A small carbon-fiber tank pressurized to 20 bar releases high-velocity blasts of air directly into the turbo housings when the throttle is stamped. This spins the compressors instantly, delivering immediate, crushing torque before the exhaust gases take over.\n\n### Transmission at the Speed of Light\nNo dual-clutch transmission on Earth could handle this power while maintaining the packaging requirements. Koenigsegg’s in-house solution is the 9-speed Light Speed Transmission (LST).\n\nBy utilizing seven individual wet multi-disc clutches operating in parallel, the LST can engage any gear combination instantly. There are no synchronizer rings. When you pull the shifter past the first detent, the computer activates "UPOD" (Ultimate Power On Demand), shifting the car directly to the optimal gear for acceleration, bypassing sequential downshifts entirely. It is a masterpiece of compact Swedish engineering.`
    }
  },
  {
    id: 'pagani-utopia',
    name: 'Utopia',
    brand: 'Pagani',
    price: 2500000,
    year: 2024,
    origin: 'Italy',
    image: '/images/pagani_utopia_1784039432478.jpg',
    gallery: [
      '/images/pagani_utopia_1784039432478.jpg',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'hypercar',
    specs: {
      engine: 'Mercedes-AMG Twin-Turbo 6.0L 60-Degree V12',
      displacement: '6.0 Liters',
      power: 864,
      torque: 811,
      redline: 6700,
      transmission: '7-Speed Manual or Transverse Automated Manual',
      drivetrain: 'Rear-Wheel Drive with Mechanical Limited-Slip Differential',
      zeroToSixty: 3.1,
      topSpeed: 220,
      weight: 2822,
      powerToWeight: '612 HP/ton',
      chassis: 'Carbo-Titanium HP62 G2 and Carbo-Triax HP62 Monocoque',
      brakes: 'Brembo Carbon-Ceramic, 410mm Front / 390mm Rear',
      productionLimit: 99
    },
    overview: 'In a world dominated by hybridization and touchscreens, Horacio Pagani’s Utopia is a radiant act of defiance. The Italian masterwork utilizes an AMG-sourced 6.0L twin-turbo V12 producing 864 horsepower, mated optionally to a gated manual transmission. The Utopia is a rolling sculpture—an analog, tactile tribute to driving purity and high-renaissance design.',
    engineeringHighlight: 'The Utopia is constructed from Pagani’s proprietary advanced composite materials: Carbo-Titanium HP62 G2 and Carbo-Triax HP62. This monocoque structure provides a torsional stiffness increase of 10.5% over previous models while keeping the dry weight at an astonishing 2,822 lbs. The cabin features zero digital touchscreens, prioritizing milled aluminum controls, analog dials, and an exposed gear shift linkage.',
    article: {
      title: 'Renaissance in Carbon: How Horacio Pagani Crafted the Utopia',
      publishDate: 'May 14, 2024',
      author: 'Francesca Rossi',
      readTime: '4 min read',
      content: `While other manufacturers compete on spreadsheets, Horacio Pagani builds art. The Pagani Utopia is the third chapter in Pagani's history, following the legendary Zonda and Huayra. It represents an rejection of current industry trends: no batteries, no heavy hybrid motors, and no dual-clutch automatics.\n\n### A Sculpture on Wheels\nTo look at the Utopia is to look at a sculpture formed by wind and hand. Horacio Pagani spent six years perfecting its shape, discarding trends like giant wings and massive side vents. Instead, the Utopia incorporates active aerodynamic flaps integrated into the rear decklid, keeping the silhouette clean and timeless.\n\nThe signature Pagani details are all elevated: the leather straps holding the clamshell hoods, the central quad-exhaust exit nested inside a circular ring, and the gullwing doors that rise gracefully into the air. The car uses aerospace-grade aluminum, milled from solid blocks, for details like the side mirrors and the custom taillights which float in carbon pods.\n\n### The Pure Mercedes-AMG V12\nProviding the pulse of the Utopia is a bespoke 6.0-liter twin-turbocharged 60-degree V12 engine built exclusively for Pagani by Mercedes-AMG. Developing 864 horsepower and 811 lb-ft of torque, this engine delivers its peak power in a smooth, swelling wave all the way to its redline, sounding like a high-pitched thundercloud.\n\nBut the real headlines belong to the transmission. Pagani rejected the heavy, detached dual-clutch transmission in favor of a 7-speed gated manual gearbox or a transverse automated manual built by Xtrac. The gated manual option features an exposed shift mechanism with polished rods and spherical joints, creating a highly tactile, physical connection with the machine.\n\n### Tactile interior, No Touchscreens\nStep inside the Utopia, and you enter a retro-futuristic mechanical laboratory. There are no touchscreens. Instead, Pagani has installed individual, beautifully backlit analog dials that sweep from left to right.\n\nThe steering wheel is milled from a single block of aluminum, taking over 20 hours of CNC machining. The exposed shifter mechanism acts as the centerpiece of the cabin, clicking into place with a mechanical, metallic note. The leather is hand-stitched, smelling of traditional Tuscan tanneries. The Utopia isn't about setting the fastest track lap—it is about restoring emotion to the act of driving.`
    }
  },
  {
    id: 'rolls-royce-droptail',
    name: 'La Rose Noire Droptail',
    brand: 'Rolls-Royce',
    price: 30000000,
    year: 2024,
    origin: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'coachbuilt',
    specs: {
      engine: 'Twin-Turbocharged 6.75L V12',
      displacement: '6.75 Liters',
      power: 593,
      torque: 620,
      redline: 5500,
      transmission: '8-Speed Automatic with Satellite-Aided shifting',
      drivetrain: 'Rear-Wheel Drive',
      zeroToSixty: 4.8,
      topSpeed: 155,
      weight: 5600,
      powerToWeight: '211 HP/ton',
      chassis: 'Bespoke Aluminum Spaceframe with Carbon Fiber Cowl',
      brakes: 'Steel ventilated disc brakes with silent calipers',
      productionLimit: 4
    },
    overview: 'The Rolls-Royce La Rose Noire Droptail is one of the most expensive and exclusive new cars in human history. Priced at an estimated $30 million, this coachbuilt masterpiece is inspired by the Black Baccara rose. The interior features a complex parquetry artwork made from 1,603 individual hand-finished wood triangles, taking over nine months of artisan work to assemble.',
    engineeringHighlight: 'The Droptail represents the pinnacle of Rolls-Royce Coachbuild. Its body is constructed from lightweight carbon fiber, steel, and aluminum, forming a low-slung, seductive roadster silhouette—a departure from traditional Rolls-Royce proportions. Tucked inside the dashboard is a one-off Audemars Piguet Royal Oak Concept watch, which can be detached and worn by the owner.',
    article: {
      title: 'The Thirty-Million Dollar Rose: Inside rolls-Royce Coachbuild',
      publishDate: 'March 18, 2024',
      author: 'Marcus Sterling',
      readTime: '5 min read',
      content: `In the gilded age of motoring, wealthy aristocrats bought rolling chassis and sent them to master coachbuilders to have custom bodies fabricated. Today, Rolls-Royce has resurrected this lost art, creating ultra-exclusive commissions for their most elite clientele. The crowning achievement of this program is the Droptail series, headlined by "La Rose Noire."\n\n### A Symphony in Red and Black\nInspired by the French Black Baccara rose, the Droptail’s paintwork is a marvel of chemistry. It took Rolls-Royce specialists over 150 iterations to perfect the color, which appears black in the shade but shines with a rich, pearlescent red under direct light. The finish consists of a secret base coat, followed by five layers of clear lacquer, each mixed with a slightly different tone of red.\n\nThe exterior trim is finished in a custom dark chrome called "Hydroshade," which is applied via a chemical deposition process rather than traditional plating, creating a liquid-metal look that contrasts beautifully with the deep rose panels.\n\n### 1,603 Pieces of Wooden Parquetry\nThe interior of La Rose Noire is home to the most complex wood parquetry work ever executed by Rolls-Royce. The wrap-around wooden cabin represents falling rose petals, constructed using 1,603 individual pieces of Black Sycamore wood sourced from France.\n\nEach triangle was hand-cut, hand-sanded, and placed with microscopic precision over a nine-month period. To avoid any color fading over time, Rolls-Royce developed a special UV-resistant lacquer that seals the Sycamore wood in its natural, untarnished state.\n\n### Effortless V12 Engineering\nUnder the long sweeping hood is Rolls-Royce’s signature 6.75-liter twin-turbocharged V12. For the Droptail, engineers massaged the motor to deliver 593 horsepower and 620 lb-ft of torque. Power is transferred to the rear wheels via an 8-speed automatic gearbox which uses GPS data to pre-select gears for upcoming corners, ensuring a completely seamless "magic carpet ride."\n\nThis isn't a car designed for race tracks or top speed records; it is a ultra-luxury yacht for the road, engineered to isolate its occupants in absolute silence while traveling with massive mechanical authority.`
    }
  },
  {
    id: 'aston-martin-valkyrie',
    name: 'Valkyrie',
    brand: 'Aston Martin',
    price: 3500000,
    year: 2023,
    origin: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1614200187524-dc5be3149463?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'track-weapon',
    specs: {
      engine: 'Cosworth Naturally Aspirated 65-Degree V12 + KERS Hybrid System',
      displacement: '6.5 Liters',
      power: 1139,
      torque: 664,
      redline: 11100,
      transmission: '7-Speed Single-Clutch Automated Manual',
      drivetrain: 'Rear-Wheel Drive',
      zeroToSixty: 2.5,
      topSpeed: 250,
      weight: 2425,
      powerToWeight: '939 HP/ton',
      chassis: '100% Carbon Fiber Monocoque (No steel in structure)',
      brakes: 'Alcon carbon-carbon, 6-piston front / rear calipers',
      productionLimit: 150
    },
    overview: 'The Aston Martin Valkyrie is an uncompromising F1 car designed for public roads. Masterminded by legendary F1 designer Adrian Newey, the Valkyrie features aerodynamics that generate over 2,400 lbs of downforce at speed. At its center is a Cosworth-built naturally aspirated 6.5L V12 that screams to an unprecedented 11,100 RPM, producing an unmatched auditory and physical driving experience.',
    engineeringHighlight: 'The Valkyrie features no heavy steel in its primary chassis structure. Aerodynamics are so dominant that the cockpit is shaped like a droplet, suspended between massive Venturi tunnels that run the length of the floor. These tunnels pull air under the car at extreme velocity, creating massive ground effect downforce without needing a giant rear wing, allowing the car to pull over 3.3 Gs in high-speed corners.',
    article: {
      title: 'Adrian Newey’s Masterpiece: How Formula 1 Shaped the Valkyrie',
      publishDate: 'December 4, 2023',
      author: 'Jenson Hunt',
      readTime: '6 min read',
      content: `The Aston Martin Valkyrie is not a sports car. It is not even a standard hypercar. It is a literal Formula 1 car adapted to carry license plates. Conceived over a glass of wine between Aston Martin’s executives and legendary Red Bull Racing aerodynamicist Adrian Newey, the Valkyrie is the most aerodynamically radical street-legal car ever built.\n\n### Venturi Tunnels and Ground Effect\nMost performance cars generate downforce by pushing air over the body using spoilers and wings. The Valkyrie does the opposite.\n\nAdrian Newey designed the cockpit to be extremely narrow, squeezing the occupants together in an F1-style reclined position. This left massive voids on either side of the cabin floors. In these spaces, Newey carved out giant Venturi tunnels that run from the front splitter, completely under the car, and exit at the rear diffuser.\n\nAir rushing through these tunnels is compressed and accelerated, creating a low-pressure zone beneath the chassis that pulls the car flat to the road. This ground-effect design allows the Valkyrie to generate an incredible 2,400 lbs of downforce at speed, enabling cornering forces exceeding 3G on standard street tires.\n\n### The Cosworth V12 Symphony\nTo power this aerodynamic featherweight, Aston Martin went to Cosworth. The requirements were simple yet insane: build a naturally aspirated V12 that was structural (meaning the rear suspension bolts directly to the engine block, just like in F1), emissions-compliant, and capable of generating over 1,000 HP without turbochargers.\n\nCosworth delivered a 6.5-liter, 65-degree V12 engine. Weighing only 454 lbs, it produces 1,000 brake horsepower at a screaming 10,500 RPM, and continues revving to its 11,100 RPM limit. It is supported by an electric motor and KERS (Kinetic Energy Recovery System) engineered by Rimac, which adds 139 horsepower of immediate electric fill, pushing the total system output to 1,139 HP.\n\n### Absolute Minimalism\nInside the Valkyrie, luxury is completely discarded in the pursuit of weight savings. The seats are custom carbon shells bonded directly to the monocoque, padded with thin Alcantara strips tailored to the owner's body.\n\nThe steering wheel is detachable to allow entry and features an integrated OLED screen containing all dashboard controls. There are no side mirrors; instead, small cameras mounted to the flanks feed high-definition screens inside the A-pillars. The windshield wiper is a massive custom single-arm unit designed to sweep the aggressively curved, canopy-style glass, and even the Aston Martin wing badge on the hood is chemically etched into the carbon fiber, measuring just 70 microns thick—making it lighter than a single human hair.\n\nThe Valkyrie is a monument of engineering that will likely never be repeated.`
    }
  }
];
