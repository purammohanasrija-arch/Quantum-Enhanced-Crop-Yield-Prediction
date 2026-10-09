// Realistic mock data for Q-FARM TWIN

export const DEFAULT_CROPS = [
  { id: 'rice', name: 'Rice', baseYield: 4.52, unit: 'tons/ha', season: 'Kharif', optimalTemp: 29, optimalRain: 1150, optimalMoisture: 65, icon: '🌾' },
  { id: 'wheat', name: 'Wheat', baseYield: 3.81, unit: 'tons/ha', season: 'Rabi', optimalTemp: 22, optimalRain: 600, optimalMoisture: 55, icon: '🌾' },
  { id: 'maize', name: 'Maize', baseYield: 4.12, unit: 'tons/ha', season: 'Kharif', optimalTemp: 26, optimalRain: 800, optimalMoisture: 60, icon: '🌽' },
  { id: 'cotton', name: 'Cotton', baseYield: 2.95, unit: 'tons/ha', season: 'Kharif', optimalTemp: 31, optimalRain: 700, optimalMoisture: 48, icon: '🌱' },
  { id: 'tomato', name: 'Tomato', baseYield: 3.20, unit: 'tons/ha', season: 'Zaid', optimalTemp: 25, optimalRain: 650, optimalMoisture: 58, icon: '🍅' },
  { id: 'sugarcane', name: 'Sugarcane', baseYield: 78.4, unit: 'tons/ha', season: 'Annual', optimalTemp: 30, optimalRain: 1600, optimalMoisture: 75, icon: '🎍' },
];

export const INITIAL_DATASET_ROWS = [
  { id: 1, crop: 'Rice', temp: 29, rainfall: 1150, humidity: 62, soilMoisture: 65, nitrogen: 82, phosphorus: 40, potassium: 120, fertilizer: 120, irrigation: 'Yes', yield: 4.52 },
  { id: 2, crop: 'Wheat', temp: 24, rainfall: 620, humidity: 58, soilMoisture: 55, nitrogen: 75, phosphorus: 38, potassium: 110, fertilizer: 110, irrigation: 'Yes', yield: 3.81 },
  { id: 3, crop: 'Maize', temp: 27, rainfall: 900, humidity: 60, soilMoisture: 58, nitrogen: 90, phosphorus: 45, potassium: 130, fertilizer: 135, irrigation: 'Yes', yield: 4.12 },
  { id: 4, crop: 'Cotton', temp: 32, rainfall: 780, humidity: 55, soilMoisture: 45, nitrogen: 70, phosphorus: 35, potassium: 95, fertilizer: 105, irrigation: 'No', yield: 2.95 },
  { id: 5, crop: 'Tomato', temp: 26, rainfall: 600, humidity: 68, soilMoisture: 52, nitrogen: 65, phosphorus: 30, potassium: 85, fertilizer: 95, irrigation: 'Yes', yield: 3.20 },
  { id: 6, crop: 'Rice', temp: 30, rainfall: 1210, humidity: 64, soilMoisture: 68, nitrogen: 85, phosphorus: 42, potassium: 125, fertilizer: 125, irrigation: 'Yes', yield: 4.65 },
  { id: 7, crop: 'Wheat', temp: 23, rainfall: 590, humidity: 56, soilMoisture: 52, nitrogen: 72, phosphorus: 36, potassium: 105, fertilizer: 108, irrigation: 'Yes', yield: 3.74 },
  { id: 8, crop: 'Maize', temp: 28, rainfall: 860, humidity: 63, soilMoisture: 60, nitrogen: 88, phosphorus: 44, potassium: 128, fertilizer: 130, irrigation: 'Yes', yield: 4.05 },
];

export const QUANTUM_BENCHMARK_METRICS = [
  { metric: 'MAE (Mean Absolute Error)', classical: 0.42, quantum: 0.38, unit: 'tons/ha', diff: '-9.5%', quantumAdvantage: true },
  { metric: 'RMSE (Root Mean Sq. Error)', classical: 0.61, quantum: 0.55, unit: 'tons/ha', diff: '-9.8%', quantumAdvantage: true },
  { metric: 'R² Score (Variance Explained)', classical: 0.84, quantum: 0.87, unit: 'ratio', diff: '+3.6%', quantumAdvantage: true },
  { metric: 'Training Epochs / Convergence', classical: '150 iters', quantum: '45 VQE steps', unit: 'iterations', diff: 'Faster Hilbert space mapping', quantumAdvantage: true },
  { metric: 'Feature Dimension Handling', classical: 'Non-linear kernel', quantum: 'Hilbert Exp(2^n)', unit: 'space', diff: 'Exponential state expressivity', quantumAdvantage: true },
];

export const YIELD_FORECAST_GROWTH_STAGES = [
  { stage: 'Sowing', predicted: 2.1, historical: 2.0, benchmark: 2.2 },
  { stage: 'Vegetative', predicted: 3.2, historical: 3.1, benchmark: 3.3 },
  { stage: 'Flowering', predicted: 4.0, historical: 3.8, benchmark: 4.1 },
  { stage: 'Grain Filling', predicted: 4.5, historical: 4.2, benchmark: 4.4 },
  { stage: 'Harvest', predicted: 4.7, historical: 4.4, benchmark: 4.6 },
];

export const HISTORICAL_YEARLY_DATA = [
  { year: '2022', yield: 3.95, rainfall: 980, fertilizer: 110, production: 7.9 },
  { year: '2023', yield: 4.15, rainfall: 1040, fertilizer: 115, production: 8.3 },
  { year: '2024', yield: 4.30, rainfall: 1120, fertilizer: 118, production: 8.6 },
  { year: '2025', yield: 4.45, rainfall: 1140, fertilizer: 120, production: 8.9 },
  { year: '2026 (Est.)', yield: 4.52, rainfall: 1150, fertilizer: 120, production: 9.04 },
];

export const FEATURE_IMPORTANCE_DATA = [
  { feature: 'Rainfall', importance: 32, icon: '🌧️', description: 'Precipitation volume during vegetative and tillering phases' },
  { feature: 'Soil Moisture', importance: 24, icon: '🌱', description: 'Root zone dielectric permittivity moisture percentage' },
  { feature: 'Temperature', importance: 17, icon: '🌡️', description: 'Diurnal range and cumulative growing degree days (GDD)' },
  { feature: 'Nitrogen (N)', importance: 14, icon: '🧪', description: 'Available soil nitrate-nitrogen content' },
  { feature: 'Irrigation Scheduling', importance: 8, icon: '💧', description: 'Precision drip and furrow automation intervals' },
  { feature: 'Phosphorus & Potassium', importance: 5, icon: '🌿', description: 'P & K elemental balance in topsoil layer' },
];

export const SMART_RECOMMENDATIONS = [
  {
    id: 1,
    title: 'Maintain current irrigation level',
    category: 'Water',
    icon: '💧',
    priority: 'Normal',
    impact: '+0.2 t/ha retention',
    details: 'Soil dielectric reading at 65% indicates adequate field capacity. Continue 2-hour scheduled drip irrigation at dawn.',
    status: 'Active'
  },
  {
    id: 2,
    title: 'Increase nitrogen slightly during panicle initiation',
    category: 'Nutrients',
    icon: '🌱',
    priority: 'Medium',
    impact: '+0.35 t/ha potential',
    details: 'Apply 15 kg/ha urea top-dressing in the next 5-7 days before flowering stage for maximum nitrogen uptake efficiency.',
    status: 'Pending'
  },
  {
    id: 3,
    title: 'Monitor temperature advisory (High risk next 2 weeks)',
    category: 'Weather',
    icon: '🌡️',
    priority: 'High',
    impact: 'Prevents -0.4 t/ha loss',
    details: 'Day temperatures expected to reach 34°C. Ensure standing water level of 3-5 cm during spikelet formation to prevent heat sterility.',
    status: 'Alert'
  },
  {
    id: 4,
    title: 'Consider straw mulching to retain soil moisture',
    category: 'Soil',
    icon: '🍂',
    priority: 'Normal',
    impact: 'Saves 18% water',
    details: 'Apply organic residue mulch around field borders to suppress evaporative loss and regulate soil microbiome temperature.',
    status: 'Recommended'
  },
  {
    id: 5,
    title: 'Current microclimate conditions are favorable for good yield',
    category: 'Overall',
    icon: '✨',
    priority: 'Positive',
    impact: '+8.2% vs baseline',
    details: 'Cumulative growing degree days and solar radiation are tracking 6% above historical 5-year averages.',
    status: 'Optimal'
  }
];

export const WEATHER_HOURLY = [
  { time: '06:00', temp: 24, humidity: 78, rainProb: 10, icon: '⛅' },
  { time: '09:00', temp: 27, humidity: 70, rainProb: 15, icon: '🌤️' },
  { time: '12:00', temp: 31, humidity: 58, rainProb: 20, icon: '☀️' },
  { time: '15:00', temp: 33, humidity: 52, rainProb: 35, icon: '⛅' },
  { time: '18:00', temp: 29, humidity: 65, rainProb: 40, icon: '🌦️' },
  { time: '21:00', temp: 26, humidity: 74, rainProb: 25, icon: '🌙' },
];

export const WEATHER_DAILY = [
  { day: 'Today', high: 32, low: 23, condition: 'Partly Cloudy', rainMm: 4, icon: '⛅' },
  { day: 'Tomorrow', high: 33, low: 24, condition: 'Sunny & Hot', rainMm: 0, icon: '☀️' },
  { day: 'Wed', high: 34, low: 25, condition: 'Scattered Heat', rainMm: 2, icon: '🌤️' },
  { day: 'Thu', high: 30, low: 22, condition: 'Thunderstorm', rainMm: 28, icon: '⛈️' },
  { day: 'Fri', high: 28, low: 21, condition: 'Moderate Rain', rainMm: 15, icon: '🌧️' },
  { day: 'Sat', high: 29, low: 22, condition: 'Pleasant & Mild', rainMm: 5, icon: '⛅' },
  { day: 'Sun', high: 31, low: 23, condition: 'Clear Sky', rainMm: 0, icon: '☀️' },
];
