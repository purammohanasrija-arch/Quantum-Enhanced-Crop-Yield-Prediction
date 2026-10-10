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
    confidence: 94,
    previousSeasonDiff: '+8.2%',
    growthStage: 'Vegetative',
    isPredicting: false,
    yieldCategory: 'Optimal / High Yield',
    yieldTier: 'Tier 1 • Top 15% Regional',
    yieldCategoryColor: 'emerald',
    yieldPotentialPct: 88,
    source: 'Quantum VQR (IBM Qiskit)',
    scaledOutput: 0.69,
    isQuantumSynced: true,
    lastSyncedTime: 'Just now',
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

  // Synchronize Quantum Lab prediction with the main farm dashboard
  const syncQuantumPrediction = ({ predictedYield, scaledOutput, features, crop }) => {
    const yieldNum = Number(parseFloat(predictedYield).toFixed(2)) || 4.51;
    const scaledNum = Number(parseFloat(scaledOutput).toFixed(2)) || 0.69;
    const area = farmArea || 2;
    const totalProd = Number((yieldNum * area).toFixed(2));

    // Determine yield category & tier based on agronomic thresholds
    let category = 'Optimal / High Yield';
    let tier = 'Tier 1 • Top 15% Regional';
    let color = 'emerald';
    let potentialPct = 88;

    if (yieldNum >= 4.2) {
      category = 'Optimal / High Yield';
      tier = 'Tier 1 • Top 15% Regional';
      color = 'emerald';
      potentialPct = Math.min(98, Math.round(80 + (yieldNum - 4.2) * 15));
    } else if (yieldNum >= 3.2) {
      category = 'Moderate / Good Yield';
      tier = 'Tier 2 • Average Regional';
      color = 'amber';
      potentialPct = Math.round(60 + (yieldNum - 3.2) * 20);
    } else {
      category = 'Low / Climate Stress Alert';
      tier = 'Tier 3 • At-Risk Deficit';
      color = 'rose';
      potentialPct = Math.max(30, Math.round(yieldNum * 15));
    }

    setPredictionData((prev) => ({
      ...prev,
      predictedYield: yieldNum,
      totalProduction: totalProd,
      confidence: 94,
      yieldCategory: category,
      yieldTier: tier,
      yieldCategoryColor: color,
      yieldPotentialPct: potentialPct,
      source: 'Quantum VQR (IBM Qiskit)',
      scaledOutput: scaledNum,
      isQuantumSynced: true,
      lastSyncedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));

    if (features) {
      setFarmInputs((prev) => ({
        ...prev,
        rainfall: features.rainfall !== undefined ? features.rainfall : prev.rainfall,
        temp: features.temp !== undefined ? features.temp : prev.temp,
        soilMoisture: features.soilMoisture !== undefined ? features.soilMoisture : prev.soilMoisture,
        nitrogen: features.nitrogen !== undefined ? features.nitrogen : prev.nitrogen,
      }));
    }

    if (crop) {
      setSelectedCrop(crop);
    }
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
        setPredictionData,
        syncQuantumPrediction,
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
