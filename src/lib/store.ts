import { create } from 'zustand';

// This file is a placeholder for the new application's state.
// We will define new state structures for managing master data and predictions here.

type AppState = {
  // Example state
  appName: string;
};

export const useAppStore = create<AppState>((set) => ({
  appName: "Scale-Up Predictor",
}));
