import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_CROPS,
  INITIAL_DATASET_ROWS,
  QUANTUM_BENCHMARK_METRICS,
  SMART_RECOMMENDATIONS,
  WEATHER_DAILY,
  WEATHER_HOURLY
} from '../data/mockData';
import { simulateWhatIf, predictYield as apiPredictYield } from '../services/api';

const FarmContext = createContext();

export function FarmProvider({ children }) {
  // Navigation: 'landing' or 'dashboard'
  const [currentPage, setCurrentPage] = useState('landing');
  
  // Dashboard active sub-view:
  // 'dashboard', 'dataset-manager', 'crop-prediction', 'what-if', 'risk-analysis',
  // 'farm-health', 'analytics', 'weather', 'quantum-lab', 'explainable-ai',
  // 'recommendations', 'farm-history', 'reports', 'digital-twin'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Farm Parameters
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [farmArea, setFarmArea] = useState(2);
  const [growthStage, setGrowthStage] = useState('Vegetative');

  // Sensor & Input Parameters
  const [farmInputs, setFarmInputs] = useState({
    crop: 'Rice',
    temp: 29,
    rainfall: 1150,
    humidity: 62,
    soilMoisture: 65,
    nitrogen: 82,
    phosphorus: 40,
    potassium: 120,
    fertilizer: 120,
    irrigation: true,
    growthStage: 'Vegetative',
    farmArea: 2,
  });

  // Predicted Yield & Health KPIs
  const [predictionData, setPredictionData] = useState({
    predictedYield: 4.52,
    unit: 'tons/ha',
    totalProduction: 9.04,
    confidence: 92,
    previousSeasonDiff: '+8.2%',
    growthStage: 'Vegetative',
    isPredicting: false,
  });

  const [farmHealthScore, setFarmHealthScore] = useState(87);
  const [healthSubScores, setHealthSubScores] = useState({
    soilHealth: 82,
    waterAvailability: 91,
    weather: 73,
    nutrients: 89,
    irrigation: 78,
  });

  const [riskLevels, setRiskLevels] = useState({
    heatStress: 'HIGH',
    lowRainfall: 'MODERATE',
    lowSoilMoisture: 'LOW',
    nutrientDeficiency: 'LOW',
    floodRisk: 'LOW',
    pestDisease: 'MODERATE',
  });

  // What-If Simulator State
  const [whatIfParams, setWhatIfParams] = useState({
    rainfallDelta: -20, // -20%
    tempDelta: 2,       // +2°C
    fertDelta: 10,      // +10%
    soilMoistureDelta: 0,
    irrigation: true,
  });

  const [whatIfResult, setWhatIfResult] = useState({
    currentYield: 4.52,
    simulatedYield: 3.91,
    diffYield: -0.61,
    impactPercentage: -13.5,
    riskLevel: 'Moderate',
  });

  // Dataset Manager State
  const [datasetMeta, setDatasetMeta] = useState({
    fileName: 'crop_yield_data.csv',
    fileSize: '245.8 KB',
    rowCount: 10000,
    columnCount: 14,
    isUploaded: true,
  });
  const [datasetRows, setDatasetRows] = useState(INITIAL_DATASET_ROWS);
  const [isAnalyzingDataset, setIsAnalyzingDataset] = useState(false);
  const [isTrainingModel, setIsTrainingModel] = useState(false);
  const [modelTrained, setModelTrained] = useState(true);

  // Recommendations
  const [recommendations, setRecommendations] = useState(SMART_RECOMMENDATIONS);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Heat Stress Advisory', text: 'Daytime temperature forecast is climbing above 33°C.', time: '10m ago', unread: true },
    { id: 2, title: 'Irrigation Scheduled', text: 'Drip cycle complete for Sector B (Rice).', time: '1h ago', unread: true },
  ]);

  // Recalculate What-If whenever parameters or base yield changes
  useEffect(() => {
    let active = true;
    simulateWhatIf(predictionData.predictedYield, whatIfParams).then((res) => {
      if (active) {
        setWhatIfResult(res);
      }
    });
    return () => { active = false; };
  }, [whatIfParams, predictionData.predictedYield]);

  // Handle Predict Action
  const triggerPrediction = async (customInputs = farmInputs) => {
    setPredictionData((prev) => ({ ...prev, isPredicting: true }));
    const res = await apiPredictYield(customInputs);
    setPredictionData({
      predictedYield: res.predictedYield,
      unit: res.unit,
      totalProduction: res.totalProduction,
      confidence: res.confidence,
      previousSeasonDiff: res.previousSeasonDiff,
      growthStage: res.growthStage,
      isPredicting: false,
    });
    return res;
  };

  // Switch to dashboard and specific sub-view
  const navigateToDashboard = (tab = 'dashboard') => {
    setCurrentPage('dashboard');
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FarmContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        activeTab,
        setActiveTab,
        navigateToDashboard,
        navigateToLanding,

        // Farm & Crops
        selectedCrop,
        setSelectedCrop,
        farmArea,
        setFarmArea,
        growthStage,
        setGrowthStage,
        farmInputs,
        setFarmInputs,

        // Predictions & KPIs
        predictionData,
        triggerPrediction,
        farmHealthScore,
        healthSubScores,
        riskLevels,

        // What-If
        whatIfParams,
        setWhatIfParams,
        whatIfResult,

        // Dataset
        datasetMeta,
        setDatasetMeta,
        datasetRows,
        setDatasetRows,
        isAnalyzingDataset,
        setIsAnalyzingDataset,
        isTrainingModel,
        setIsTrainingModel,
        modelTrained,
        setModelTrained,

        // Recommendations & Alerts
        recommendations,
        setRecommendations,
        notifications,
        setNotifications,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
}

export function useFarm() {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
}
