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
  id: number;
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
  waitlist: WaitlistUser[];
  // Actions
  getUniqueValues: (key: keyof Plant) => string[];
  addPlant: (plant: Omit<Plant, 'id'>) => void;
  addEquipment: (equipment: Omit<Equipment, 'id'>) => void;
  addToWaitlist: (user: Omit<WaitlistUser, 'id' | 'date'>) => void;
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
  waitlist: [
    { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", date: new Date("2024-05-20T10:00:00Z") },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", date: new Date("2024-05-21T11:30:00Z") },
  ],

  // --- Actions ---
  getUniqueValues: (key: keyof Plant) => {
    const { plants } = get();
    const values = plants.map(plant => plant[key]);
    return [...new Set(values)];
  },

  addPlant: (plant) => {
    set((state) => ({
      plants: [
        ...state.plants,
        {
          id: state.plants.length > 0 ? Math.max(...state.plants.map(p => p.id)) + 1 : 1,
          ...plant,
        },
      ],
    }));
  },

  addEquipment: (equipment) => {
    set((state) => ({
      equipment: [
        ...state.equipment,
        {
          id: state.equipment.length > 0 ? Math.max(...state.equipment.map(e => e.id)) + 1 : 1,
          ...equipment,
        },
      ],
    }));
  },

  addToWaitlist: (user) => {
    set((state) => ({
      waitlist: [
        ...state.waitlist,
        {
          id: state.waitlist.length > 0 ? Math.max(...state.waitlist.map(u => u.id)) + 1 : 1,
          ...user,
          date: new Date(),
        }
      ]
    }))
  }
}));