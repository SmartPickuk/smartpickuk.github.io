import { Product } from '../types';

export const productsData: Product[] = [
  {
    id: 'prod-headphones-soundcore-q30',
    name: 'Anker Soundcore Life Q30 Wireless ANC Headphones',
    brand: 'Anker Soundcore',
    category: 'audio',
    categoryLabel: 'Audio',
    icon: '🎧',
    imageUrl: '/src/assets/images/headphones_wireless_1791023330339.jpg',
    tagline: 'Best wireless noise cancelling headphones under £80 in the UK',
    description: 'Hybrid active noise cancellation with three modes (Transport, Outdoor, Indoor), 40-hour battery life with ANC on, and customisable EQ via the Soundcore app. Ultra-comfortable memory foam earcups suited for London Underground commutes.',
    rating: 4.6,
    reviewCount: 68420,
    priceGbp: 59.99,
    originalPriceGbp: 79.99,
    dealTag: 'Save 25%',
    asin: 'B08HMWZBXC',
    awards: 'Best Value Under £80',
    specs: {
      'Battery Life': '40 hrs (ANC On) / 60 hrs (ANC Off)',
      'Noise Cancelling': 'Hybrid Active Noise Cancellation (3 Modes)',
      'Connectivity': 'Bluetooth 5.0 + NFC + 3.5mm Aux jack',
      'Charging': 'USB-C fast charge (5 mins = 4 hours)',
      'Weight': '260g with memory foam padding',
      'Microphone': 'Dual mics with uplink noise reduction'
    },
    pros: [
      'Outstanding active noise cancellation for the sub-£70 UK price bracket',
      'Class-leading 40+ hours battery life on long train trips or flights',
      'Companion app includes 22 EQ presets and custom hearing test profile',
      'Foldable design with a durable hard-shell travel case included'
    ],
    cons: [
      'Microphone is adequate for quiet rooms but picks up wind on breezy UK streets',
      'Bass is quite prominent out-of-the-box (easily adjusted in the app)'
    ],
    verdict: 'The undisputed budget ANC king in the UK. Competes directly with headphones three times the price for blocking commuter rumble.',
    ukFeatures: [
      'Includes USB-C cable compatible with standard UK 5V phone plugs',
      'Effective transport mode tuned to attenuate low engine rumble on Tube/National Rail',
      '2-year Anker UK manufacturer replacement warranty'
    ],
    inStock: true,
    featuredInGuideId: 'guide-wireless-headphones'
  },
  {
    id: 'prod-headphones-sony-wh1000xm4',
    name: 'Sony WH-1000XM4 Noise Cancelling Wireless Headphones',
    brand: 'Sony',
    category: 'audio',
    categoryLabel: 'Audio',
    icon: '🎧',
    imageUrl: '/src/assets/images/headphones_wireless_1791023330339.jpg',
    tagline: 'The gold standard in noise cancellation, comfort, and multipoint Bluetooth',
    description: 'Industry-leading noise cancellation powered by the HD Noise Cancelling Processor QN1. Features Speak-to-Chat, multipoint pairing to connect your laptop and phone simultaneously, and 30-hour battery life.',
    rating: 4.8,
    reviewCount: 42100,
    priceGbp: 199.00,
    originalPriceGbp: 249.00,
    dealTag: 'Save £50',
    asin: 'B08667428R',
    awards: 'Best Premium Pick 2026',
    specs: {
      'Battery Life': '30 hours (ANC On)',
      'Noise Cancelling': 'Dual Sensor QN1 Industry-leading ANC',
      'Connectivity': 'Bluetooth 5.0, Multipoint dual device, LDAC',
      'Charging': 'USB-C (10 mins = 5 hrs)',
      'Weight': '254g lightweight ergonomic design',
      'Smart Features': 'Speak-to-Chat, Wear detection, Ambient Sound Control'
    },
    pros: [
      'Sublime noise cancellation eliminates office chatter and aircraft cabin drone',
      'Seamless multi-point Bluetooth switching between phone and work laptop',
      'Exceptionally plush pads that can be worn for entire 8-hour workdays without fatigue',
      'Rich, detailed audio resolution with Sony DSEE Extreme upscaling'
    ],
    cons: [
      'Touchpad gestures take a couple of days to get used to in cold weather',
      'No official IP water resistance rating (not suited for heavy rain)'
    ],
    verdict: 'Still the benchmark premium everyday headphone in the UK. Better value now than newer XM5 models because it folds into a compact case.',
    ukFeatures: [
      'Foldable flat hinge ideal for commuter bags & airplane travel from Heathrow/Gatwick',
      'UK official 1-year Sony Electronics warranty',
      'Full Alexa and Google Assistant integration'
    ],
    inStock: true,
    featuredInGuideId: 'guide-wireless-headphones'
  },
  {
    id: 'prod-airfryer-ninja-dualzone-af300uk',
    name: 'Ninja Foodi DualZone Digital Air Fryer 7.6L [AF300UK]',
    brand: 'Ninja',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    icon: '🍳',
    imageUrl: '/src/assets/images/air_fryer_kitchen_1791023346683.jpg',
    tagline: 'The UK’s best-selling 2-drawer air fryer with Sync Cook technology',
    description: 'Cook 2 foods, 2 ways, and finish at the exact same time with Ninja Sync Cook. Dual independent 3.8L baskets give 7.6L total capacity, large enough to cook a 1.6kg chicken in one drawer and crispy chips in the other.',
    rating: 4.8,
    reviewCount: 39500,
    priceGbp: 149.00,
    originalPriceGbp: 199.99,
    dealTag: 'Save 25%',
    asin: 'B08GCS8QZJ',
    awards: 'Best Overall Air Fryer UK',
    specs: {
      'Total Capacity': '7.6 Litres (2x 3.8L baskets)',
      'Power Wattage': '2400W (Max combined)',
      'Cooking Functions': '6 (Air Fry, Max Crisp, Roast, Bake, Reheat, Dehydrate)',
      'Temperature Range': '40°C – 240°C',
      'Dimensions': 'H: 31.5cm x W: 37.5cm x D: 35cm',
      'Cleaning': 'Non-stick dishwasher-safe crisper plates and baskets'
    },
    pros: [
      'Sync Finish solves the classic meal-timing dilemma effortlessly',
      'Costs up to 75% less electricity than heating an ordinary UK fan oven',
      'Crisps frozen chips and fresh vegetables with 75% less oil',
      'Fits neatly under standard British kitchen wall cabinets (31.5cm height)'
    ],
    cons: [
      'Wider footprint requires at least 40cm of clear kitchen worktop space',
      'Individual baskets cannot fit an oversized 2kg+ Sunday roast whole chicken'
    ],
    verdict: 'The benchmark UK household air fryer. Easy to clean, saves noticeable money on electricity bills, and cooks dinner twice as fast.',
    ukFeatures: [
      'Fitted with fused BS 1363 UK 3-pin plug (240V 50Hz)',
      'Official UK recipe booklet and quick start cooking guide included',
      '2-year Ninja UK manufacturer guarantee upon free registration'
    ],
    inStock: true,
    featuredInGuideId: 'guide-air-fryers'
  },
  {
    id: 'prod-airfryer-cosori-55l-xxl',
    name: 'COSORI Air Fryer 5.5L XXL [CP158-AF]',
    brand: 'COSORI',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    icon: '🍳',
    imageUrl: '/src/assets/images/air_fryer_kitchen_1791023346683.jpg',
    tagline: 'Compact square basket design ideal for smaller UK kitchen worktops',
    description: 'Generous 5.5L single square basket holds a whole 2kg chicken or 1kg of chips while taking up less counter depth. 11 one-touch presets with preheat function and shake reminders.',
    rating: 4.7,
    reviewCount: 54100,
    priceGbp: 79.99,
    originalPriceGbp: 99.99,
    dealTag: 'Save 20%',
    asin: 'B07N8N6C85',
    awards: 'Best Value Single Basket',
    specs: {
      'Total Capacity': '5.5 Litres (Square basket)',
      'Power Wattage': '1700W',
      'Presets': '11 One-touch cooking programmes',
      'Temperature Range': '75°C – 205°C',
      'Dimensions': 'H: 32cm x W: 30cm x D: 30cm',
      'Cleaning': 'PFOA-free non-stick removable inner basket'
    },
    pros: [
      'Square basket accommodates whole flat foods far better than round fryers',
      'Very competitive price tag under £80 for a family-sized 5.5L capacity',
      'Preheat function yields significantly crispier pastry and frozen items',
      'Comes with a spiral-bound 100-recipe cookbook'
    ],
    cons: [
      'Can only cook one temperature/time setting at once (unlike dual-zone fryers)',
      'Beeps are somewhat loud with no volume mute switch'
    ],
    verdict: 'Superb choice for UK flats or kitchens where counter space is limited but you still need to feed 3-4 people comfortably.',
    ukFeatures: [
      'Moulded UK 3-pin plug with British Standard Kite mark compliance',
      'Temperatures displayed natively in Celsius (°C)',
      'UK customer support and 2-year warranty'
    ],
    inStock: true,
    featuredInGuideId: 'guide-air-fryers'
  },
  {
    id: 'prod-powerbank-anker-737',
    name: 'Anker 737 Power Bank (PowerCore 24K, 140W)',
    brand: 'Anker',
    category: 'travel',
    categoryLabel: 'Travel',
    icon: '🔋',
    imageUrl: '/src/assets/images/power_bank_travel_1791023360064.jpg',
    tagline: 'Ultra-powerful 140W high-speed bank with smart digital screen',
    description: 'Equipped with the latest Power Delivery 3.1 and bi-directional technology to quickly recharge the power bank or get a 140W ultra-powerful charge for a MacBook Pro, Dell XPS, or iPhone 15/16. Real-time smart display shows battery percentage, output wattage, and recharge time.',
    rating: 4.7,
    reviewCount: 14200,
    priceGbp: 89.99,
    originalPriceGbp: 129.99,
    dealTag: 'Save £40',
    asin: 'B09VPHVT2Z',
    awards: 'Best Heavy-Duty Laptop Charger',
    specs: {
      'Capacity': '24,000mAh (86.4Wh - Airline Approved)',
      'Max Output': '140W Single Port PD 3.1 (Combined max 140W)',
      'Ports': '2x USB-C (140W in/out) + 1x USB-A (18W)',
      'Display': 'TFT colour smart digital power display',
      'Recharge Time': '0 to 100% in ~52 minutes with 140W wall brick',
      'Weight': '635g solid build'
    },
    pros: [
      'Can fast-charge a 16" MacBook Pro from 0 to 50% in just 28 minutes',
      'Informative colour screen shows exact live watts per port and health',
      '86.4Wh capacity is comfortably below the 100Wh airline carry-on limit (CAA / FAA / EASA)',
      'Recharges itself from empty to full in under an hour'
    ],
    cons: [
      'Heavier at 635g; better suited for a backpack or laptop sleeve than a jacket pocket',
      'Premium price compared to basic 10,000mAh smartphone-only bricks'
    ],
    verdict: 'The ultimate travel and remote working power station for UK professionals who need to keep laptops, tablets, and phones alive on trains and flights.',
    ukFeatures: [
      'Compliant with UK Civil Aviation Authority (CAA) rules for hand luggage',
      'Includes 140W rated USB-C to USB-C 0.6m braided cable',
      'Anker UK 24-month worry-free replacement warranty'
    ],
    inStock: true,
    featuredInGuideId: 'guide-power-banks'
  },
  {
    id: 'prod-powerbank-iniubank-10000',
    name: 'INIU 10,000mAh Ultra-Slim 22.5W Fast Charging Power Bank',
    brand: 'INIU',
    category: 'travel',
    categoryLabel: 'Travel',
    icon: '🔋',
    imageUrl: '/src/assets/images/power_bank_travel_1791023360064.jpg',
    tagline: 'Pocket-sized everyday charging with handy fold-out phone stand',
    description: 'One of the slimmest 10,000mAh battery packs on the market (just 1.5cm thick). Delivers up to 22.5W high-speed charging via USB-C and USB-A, compatible with iPhone, Samsung Galaxy, and AirPods. Includes a clever built-in slide-out kickstand to watch videos on train commutes.',
    rating: 4.6,
    reviewCount: 31200,
    priceGbp: 18.99,
    originalPriceGbp: 24.99,
    dealTag: 'Save 24%',
    asin: 'B07PNL5STG',
    awards: 'Best Budget Pocket Bank',
    specs: {
      'Capacity': '10,000mAh (37Wh)',
      'Max Output': '22.5W Fast Charge (PD 3.0 & QC 4.0)',
      'Ports': '1x USB-C (Input/Output) + 2x USB-A (Output)',
      'Weight': '198g ultra-lightweight',
      'Thickness': '1.5cm slimline chassis',
      'Extras': 'Paw-print LED battery indicator + slide-out phone stand'
    },
    pros: [
      'Remarkably slim and light enough to slip into a jeans or jacket pocket',
      'Built-in kickstand lets you prop your phone up hands-free on the train',
      'Recharges an iPhone 15 or Galaxy S24 approximately 2 to 2.2 full times',
      'Incredible value under £20 with high-grade protection against overheating'
    ],
    cons: [
      'Not designed for charging laptops or heavy-draw USB-C devices',
      'LED indicator shows battery in quarters rather than exact percentage numerals'
    ],
    verdict: 'The ideal everyday carry power bank for UK shoppers who want reliable phone backup without carrying a heavy brick.',
    ukFeatures: [
      'Travel safe on British Airways, EasyJet, Jet2, and Ryanair flights',
      '3-year industry-leading replacement warranty from INIU',
      'Includes USB-C cable and soft mesh travel pouch'
    ],
    inStock: true,
    featuredInGuideId: 'guide-power-banks'
  },
  {
    id: 'prod-vacuum-roborock-q7-max',
    name: 'Roborock Q7 Max+ Robot Vacuum & Mop with Auto-Empty Dock',
    brand: 'Roborock',
    category: 'cleaning',
    categoryLabel: 'Cleaning',
    icon: '🧹',
    imageUrl: '/src/assets/images/robot_vacuum_cleaner_1791023372958.jpg',
    tagline: 'Precision PreciSense LiDAR navigation with 7-week auto-emptying',
    description: 'Boasts 4200Pa powerful suction and combined electronic water tank for simultaneous vacuuming and mopping. The Auto-Empty Pure dock automatically empties the dustbin into a 2.5L sealed bag, requiring maintenance only once every 7 weeks.',
    rating: 4.6,
    reviewCount: 11900,
    priceGbp: 349.00,
    originalPriceGbp: 499.00,
    dealTag: 'Save £150',
    asin: 'B09R1T6Y78',
    awards: 'Best Smart Robot Vacuum UK',
    specs: {
      'Suction Power': '4200Pa HyperForce Suction',
      'Navigation': 'PreciSense LiDAR 3D multi-level mapping',
      'Mop Function': 'Electronic 350ml water tank with 30 water flow levels',
      'Dust Bag': '2.5L auto-empty dock (holds up to 7 weeks of debris)',
      'Battery Runtime': 'Up to 180 minutes (cleans up to 300 sqm)',
      'Obstacle Clearance': 'Climbs 2cm thresholds and transitions'
    },
    pros: [
      'LiDAR scanner maps multi-storey British homes accurately without bumping furniture',
      'Handles transitions between kitchen tiles and lounge wool carpets with ease',
      'Sealed dust bag in dock is a lifesaver for UK allergy and asthma sufferers',
      'Solid rubber brush resist hair tangles far better than traditional bristled rollers'
    ],
    cons: [
      'Mop is a passive drag pad (good for daily dust, but not for heavy sticky spills)',
      'Requires a designated floor plug position for the auto-empty base station'
    ],
    verdict: 'The smartest automated cleaning upgrade for busy British households. Saves hours of vacuuming every week with zero fuss.',
    ukFeatures: [
      'Fitted with standard UK 3-pin fused power cord',
      'App supports Amazon Alexa UK and Google Home voice commands',
      'Multi-floor mapping works effortlessly with two-storey UK semi-detached houses'
    ],
    inStock: true,
    featuredInGuideId: 'guide-robot-vacuums'
  },
  {
    id: 'prod-coffee-sage-barista-express',
    name: 'Sage The Barista Express Espresso Machine [SES875BSS]',
    brand: 'Sage',
    category: 'kitchen',
    categoryLabel: 'Kitchen',
    icon: '☕',
    imageUrl: '/src/assets/images/espresso_coffee_machine_1791023387623.jpg',
    tagline: 'Bean-to-cup third wave espresso with precision integrated conical burr grinder',
    description: 'Craft authentic café-quality third wave specialty coffee at home. Integrated precision conical burr grinder delivers the right amount of coffee on demand. Features 15-bar Italian pump, PID digital temperature control, and a powerful manual micro-foam steam wand for latte art.',
    rating: 4.8,
    reviewCount: 16700,
    priceGbp: 499.00,
    originalPriceGbp: 629.95,
    dealTag: 'Save £130',
    asin: 'B07B2X3F99',
    awards: 'Best Bean-to-Cup Espresso',
    specs: {
      'Grinder': 'Integrated stainless steel conical burr with 18 grind settings',
      'Pump Pressure': '15-bar Italian pump with low-pressure pre-infusion',
      'Heating System': '1850W Thermocoil with PID temperature control',
      'Water Tank': '2 Litres with integrated water filter (crucial for UK hard water)',
      'Milk Wand': 'Commercial-style 360-degree stainless steel steam wand',
      'Dimensions': 'H: 40cm x W: 33cm x D: 31cm'
    },
    pros: [
      'Makes noticeably superior espresso and flat whites compared to pod capsule machines',
      'Built like a commercial appliance with brushed stainless steel construction',
      'PID temperature stability ensures coffee is extracted at exactly 93°C without scorching',
      'Includes professional 54mm portafilter, tamper, trimming tool, and milk jug'
    ],
    cons: [
      'Requires a slight learning curve to dial in grind size for fresh coffee beans',
      'Requires regular descaling in London, Midlands and South East hard water areas'
    ],
    verdict: 'The reigning champion of home espresso in the UK. Pays for itself within months if you normally buy flat whites at high-street coffee shops.',
    ukFeatures: [
      'UK 3-pin plug (220-240V)',
      'Includes Clara water filter cartridges specifically formulated for UK hard water scaling',
      '2-year Sage UK repair and replacement warranty with London customer service'
    ],
    inStock: true,
    featuredInGuideId: 'guide-coffee-machines'
  },
  {
    id: 'prod-chair-sihoo-m57',
    name: 'SIHOO M57 Ergonomic Office Chair with 3D Adjustable Armrests',
    brand: 'SIHOO',
    category: 'office',
    categoryLabel: 'Office',
    icon: '💺',
    imageUrl: '/src/assets/images/ergonomic_office_chair_1791023399700.jpg',
    tagline: 'Full breathable mesh ergonomic chair with dynamic 2-way lumbar support',
    description: 'Designed for long 8+ hour work sessions. High-elastic breathable mesh keeps you cool, while the two-way adjustable lumbar support cradles your lower back. Includes 3D armrests, 126° reclining tilt lock, and multi-angle headrest for posture support.',
    rating: 4.5,
    reviewCount: 9800,
    priceGbp: 179.99,
    originalPriceGbp: 219.99,
    dealTag: 'Save £40',
    asin: 'B07GNDDNMW',
    awards: 'Best Ergonomic Chair Under £200',
    specs: {
      'Material': 'High-tensile breathable polymesh back and seat',
      'Lumbar Support': 'Dual-directional (height and depth adjustable)',
      'Armrests': '3D adjustable (height, forward/back, pivot angle)',
      'Gas Lift': 'BIFMA and SGS certified Class 3 steel cylinder',
      'Max Weight': '150 kg (approx 23.6 stone)',
      'Tilt Range': '90° upright to 126° relax recline'
    },
    pros: [
      'All-mesh design prevents heat buildup during humid summer UK afternoons',
      'Highly customizable lumbar support directly alleviates lower back tension',
      'Smooth polyurethane castors roll silently on both carpet and hardwood floors',
      'Straightforward 25-minute assembly with clear instructions and tools provided'
    ],
    cons: [
      'Mesh seat feels firmer than traditional thick foam if you prefer soft cushioning',
      'Headrest is best suited for individuals between 5ft 4in and 6ft 2in'
    ],
    verdict: 'The most recommended home-working chair on UK remote work forums under £200. Delivers 80% of Herman Miller features at a fraction of the cost.',
    ukFeatures: [
      'Compliant with UK DSE (Display Screen Equipment) workstation guidelines',
      'Castors are safe on typical British twist-pile carpets and laminate flooring',
      '3-year SIHOO UK manufacturer parts guarantee'
    ],
    inStock: true,
    featuredInGuideId: 'guide-office-chairs'
  }
];

export const productCategories = [
  { id: 'all', name: 'All Categories', icon: '✨' },
  { id: 'audio', name: 'Audio', icon: '🎧' },
  { id: 'kitchen', name: 'Home & Kitchen', icon: '🍳' },
  { id: 'travel', name: 'Travel & Power', icon: '🔋' },
  { id: 'cleaning', name: 'Cleaning & Vacuums', icon: '🧹' },
  { id: 'office', name: 'Home Office', icon: '💺' },
  { id: 'electronics', name: 'Electronics', icon: '💻' }
];
