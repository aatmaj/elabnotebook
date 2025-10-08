import { create } from 'zustand';

// --- Data Types ---
export type Plant = {
  id: number;
  name: string;
  location: string;
  category: string;
  vertical: string;
  market: string;
};

export type Equipment = {
  id: number;
  name: string;
  type: string;
  plant: string;
  capacity: string;
};

export type Parameter = {
  id: number;
  name: string;
  unitOp: string;
  min: number;
  max: number;
  unit: string;
};

// --- App State ---
type AppState = {
  plants: Plant[];
  equipment: Equipment[];
  parameters: Parameter[];
  // Actions
  getUniqueValues: (key: keyof Plant) => string[];
};

// --- Store Implementation ---
export const useAppStore = create<AppState>((set, get) => ({
  // --- State Properties ---
  plants: [
    { id: 1, name: "PharmaPlant A", location: "New Jersey", category: "Pilot", vertical: "OSD", market: "USA" },
    { id: 2, name: "PharmaPlant B", location: "Hyderabad", category: "Plant 1", vertical: "Injectable", market: "India" },
    { id: 3, name: "LabScale Labs", location: "San Diego", category: "Lab", vertical: "OSD", market: "USA" },
    { id: 4, name: "Euro-Formulate", location: "Frankfurt", category: "Plant 2", vertical: "Liquid", market: "EU" },
  ],
  equipment: [
    { id: 1, name: "Granulator-01", type: "Top Spray Granulator", plant: "PharmaPlant A", capacity: "100L" },
    { id: 2, name: "Compressor-5", type: "Tablet Press", plant: "PharmaPlant B", capacity: "500,000 tablets/hr" },
    { id: 3, name: "Lab Granulator", type: "Wet Granulator", plant: "LabScale Labs", capacity: "5L" },
    { id: 4, name: "Coater-EU-01", type: "Coater", plant: "Euro-Formulate", capacity: "150L" },
  ],
  parameters: [
    { id: 1, name: "Spray Rate", unitOp: "Granulation", min: 50, max: 200, unit: "mL/min" },
    { id: 2, name: "Turret Speed", unitOp: "Compression", min: 10, max: 60, unit: "RPM" },
  ],

  // --- Actions ---
  getUniqueValues: (key: keyof Plant) => {
    const { plants } = get();
    const values = plants.map(plant => plant[key]);
    return [...new Set(values)];
  },
}));
