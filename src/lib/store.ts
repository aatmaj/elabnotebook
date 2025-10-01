import { create } from 'zustand';

export type Experiment = {
  id: string;
  name: string;
  project: string;
  date: string;
  scientist: string;
  tags: string[];
  methodology: string;
  outcome: string;
};

const initialExperiments: Experiment[] = [
  {
    id: "EXP-001",
    name: "Metformin ER 500mg Dissolution Study",
    project: "PROJ-001",
    date: "2023-11-10",
    scientist: "user-avatar-1",
    tags: ["metformin", "dissolution", "qbd"],
    methodology: "USP Apparatus II (Paddles) at 50 RPM in 900mL of phosphate buffer at pH 6.8. Samples taken at 1, 2, 4, 6, and 8 hours.",
    outcome: "F2 similarity factor of 68 achieved against the reference listed drug (RLD), meeting the bioequivalence acceptance criteria."
  },
  {
    id: "EXP-002",
    name: "Amlodipine Besylate API Characterization",
    project: "PROJ-002",
    date: "2023-10-22",
    scientist: "user-avatar-2",
    tags: ["api-char", "amlodipine", "polymorphism"],
    methodology: "Powder X-Ray Diffraction (PXRD) analysis performed on the raw API lot #AB-2023-10-05. Scanned from 2° to 40° 2θ.",
    outcome: "Characteristic peaks at 10.1°, 20.3°, and 25.4° 2θ confirm the material is consistent with Polymorphic Form A."
  },
  {
    id: "EXP-003",
    name: "Paracetamol IV Excipient Compatibility",
    project: "PROJ-003",
    date: "2023-09-05",
    scientist: "user-avatar-1",
    tags: ["formulation", "excipients", "hplc"],
    methodology: "Binary mixtures of Paracetamol API with various excipients (Mannitol, Cysteine HCl, Sodium Chloride) were stored at 40°C/75% RH for 4 weeks. Analyzed by a stability-indicating HPLC method.",
    outcome: "No significant degradation or new impurity peaks observed with any of the tested excipients. All excipients deemed compatible."
  },
    {
    id: "EXP-004",
    name: "Dapoxetine ER Stability - 3 Month Accelerated",
    project: "PROJ-005",
    date: "2024-01-15",
    scientist: "user-avatar-3",
    tags: ["stability", "dapoxetine", "accelerated"],
    methodology: "Finished tablets from Lot #DAP-ER-23-01 stored at 40°C/75% RH. Tested for Assay, Impurities, and Dissolution at the 3-month timepoint.",
    outcome: "Assay remains at 99.5%. Total impurities at 0.12%. Dissolution profile remains within specification. The formulation is stable under accelerated conditions."
  },
  {
    id: "EXP-005",
    name: "Metformin ER - Wet Granulation Trial",
    project: "PROJ-001",
    date: "2023-12-01",
    scientist: "user-avatar-2",
    tags: ["metformin", "granulation", "process-dev"],
    methodology: "High-shear wet granulation process trial using a 10% povidone (PVP K30) binder solution. Granules were dried to a target LOD of 2.0%.",
    outcome: "Good granule flowability (Angle of Repose: 28°) and compressibility achieved. Suitable for tablet compression trials."
  }
];


type ExperimentState = {
  experiments: Experiment[];
  addExperiment: (experiment: Experiment) => void;
};

export const useExperimentStore = create<ExperimentState>((set) => ({
  experiments: initialExperiments,
  addExperiment: (experiment) =>
    set((state) => ({ experiments: [experiment, ...state.experiments] })),
}));
