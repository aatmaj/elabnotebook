import { create } from 'zustand';

// --- Data Types ---
export type Plant = {
  id: string; // Changed for Firestore
  userId: string; // To make it user-specific
  name: string;
  location: string;
  category: string;
  vertical: string;
  market: string;
};

export type Equipment = {
  id: string; // Changed for Firestore
  userId: string; // To make it user-specific
  name: string;
  type: string;
  plant: string; // This is the name of the linked plant
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

export type WaitlistUser = {
  id: string; // Changed to string for Firestore
  firstName: string;
  lastName: string;
  email: string;
  date: Date;
}

// --- App State ---
type AppState = {
  plants: Plant[];
  equipment: Equipment[];
  parameters: Parameter[];
  // Actions
  getUniqueValues: (key: keyof Plant) => string[];
  setPlants: (plants: Plant[]) => void;
  addPlant: (plant: Omit<Plant, 'id' | 'userId'>) => void;
  addEquipment: (equipment: Omit<Equipment, 'id' | 'userId'>) => void;
};

// --- Store Implementation ---
export const useAppStore = create<AppState>((set, get) => ({
  // --- State Properties ---
  plants: [],
  equipment: [],
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
  
  setPlants: (plants) => set({ plants }),

  addPlant: (plant) => {
    // This is now handled by Firestore, but keeping the structure for potential future local state needs.
  },

  addEquipment: (equipment) => {
    // This is now handled by Firestore.
  },
}));
