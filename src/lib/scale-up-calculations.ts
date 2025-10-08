

export type PredictionInput = {
    productName: string;
    unitOperation: "Top Spray Granulation" | "Wet Granulation" | "Compression" | "Coating" | "Blending" | "Milling" | "Bottom Spray Granulation (Wurster)" | "Roll Compaction" | "Drying" | "Sifting" | "Capsule Filling" | "Powder Layering" | "Hot Melt Extrusion" | "Extrusion/Spheronization";
    category: "Lab → Pilot" | "Pilot → Plant 1" | "Plant 1 → Plant 2";
    strength: number;
    scaleSelection: "Scale 2" | "Scale 3" | "Scale 4";
    // Granulation
    sprayRate?: number;
    binderPercentage?: number;
    inletTemp?: number;
    outletTemp?: number;
    panSpeed?: number;
    nozzlePosition?: number;
    // Compression
    turretSpeed?: number;
    numberOfPunches?: number;
    compressionForce?: number;
    // Coating
    bedSpeed?: number;
    atomizationPressure?: number;
    // Blending
    blendingTime?: number;
    blenderSpeed?: number;
    // Milling
    millSpeed?: number;
    screenSize?: number;
    // Roll Compaction
    rollForce?: number;
    rollSpeed?: number;
    gapSize?: number;
};

export type RecommendedParameter = {
    name: string;
    currentValue: number | string;
    recommendedValue: number | string;
    unit: string;
    formula: string; // New field for the derivation formula
}

export type PredictionOutput = {
    targetScale: string;
    recommendedParameters: RecommendedParameter[];
    constraints: string[];
};

// Base scaling factors for the category transition.
const CATEGORY_SCALE_FACTORS = {
    "Lab → Pilot": 10,
    "Pilot → Plant 1": 5,
    "Plant 1 → Plant 2": 2,
};

// Additional multipliers based on the target scale selection.
const SCALE_MULTIPLIERS = {
    "Scale 2": 1.0,
    "Scale 3": 1.5,
    "Scale 4": 2.0,
};


const DUMMY_UNITS = {
    sprayRate: "g/min",
    binderPercentage: "%",
    inletTemp: "°C",
    outletTemp: "°C",
    panSpeed: "RPM",
    nozzlePosition: "",
    turretSpeed: "RPM",
    numberOfPunches: "",
    compressionForce: "kN",
    bedSpeed: "RPM",
    atomizationPressure: "bar",
    blendingTime: "min",
    blenderSpeed: "RPM",
    millSpeed: "RPM",
    screenSize: "microns",
    rollForce: "kN/cm",
    rollSpeed: "RPM",
    gapSize: "mm",
};

/**
 * Calculates the scaled-up parameters based on the input.
 * This is a deterministic function using simplified process engineering models.
 */
export function calculateScaleUp(input: PredictionInput): PredictionOutput {
    // Combine the category factor with the selection multiplier for the final scale factor.
    const categoryFactor = CATEGORY_SCALE_FACTORS[input.category];
    const selectionMultiplier = SCALE_MULTIPLIERS[input.scaleSelection];
    const scaleFactor = categoryFactor * selectionMultiplier;

    const output: PredictionOutput = {
        targetScale: input.scaleSelection,
        recommendedParameters: [],
        constraints: [],
    };

    switch (input.unitOperation) {
        case "Top Spray Granulation":
        case "Bottom Spray Granulation (Wurster)":
        case "Powder Layering":
        case "Wet Granulation":
            {
                const currentSprayRate = input.sprayRate || 100;
                const recommendedSprayRate = currentSprayRate * Math.sqrt(scaleFactor);
                output.recommendedParameters.push({
                    name: "Spray Rate",
                    currentValue: currentSprayRate,
                    recommendedValue: recommendedSprayRate.toFixed(2),
                    unit: DUMMY_UNITS.sprayRate,
                    formula: `SR_new = SR_current * sqrt(scaleFactor) = ${currentSprayRate} * sqrt(${scaleFactor.toFixed(2)})`
                });

                const currentInletTemp = input.inletTemp || 60;
                const recommendedInletTemp = currentInletTemp * 1.05;
                output.recommendedParameters.push({
                    name: "Inlet Temp",
                    currentValue: currentInletTemp,
                    recommendedValue: recommendedInletTemp.toFixed(2),
                    unit: DUMMY_UNITS.inletTemp,
                    formula: `T_in,new = T_in,current * 1.05 = ${currentInletTemp} * 1.05`
                });

                const currentPanSpeed = input.panSpeed || 10;
                const recommendedPanSpeed = currentPanSpeed / Math.sqrt(scaleFactor);
                 output.recommendedParameters.push({
                    name: "Pan Speed",
                    currentValue: currentPanSpeed,
                    recommendedValue: recommendedPanSpeed.toFixed(2),
                    unit: DUMMY_UNITS.panSpeed,
                    formula: `PanSpeed_new = PanSpeed_current / sqrt(scaleFactor) = ${currentPanSpeed} / sqrt(${scaleFactor.toFixed(2)})`
                });
            }
            break;

        case "Compression":
            {
                const currentTurretSpeed = input.turretSpeed || 25;
                const recommendedTurretSpeed = currentTurretSpeed * 0.9;
                output.recommendedParameters.push({
                    name: "Turret Speed",
                    currentValue: currentTurretSpeed,
                    recommendedValue: recommendedTurretSpeed.toFixed(2),
                    unit: DUMMY_UNITS.turretSpeed,
                    formula: `RPM_turret,new = RPM_current * 0.9 = ${currentTurretSpeed} * 0.9`
                });

                const currentCompressionForce = input.compressionForce || 15;
                const recommendedCompressionForce = currentCompressionForce;
                 output.recommendedParameters.push({
                    name: "Compression Force",
                    currentValue: currentCompressionForce,
                    recommendedValue: recommendedCompressionForce.toFixed(2),
                    unit: DUMMY_UNITS.compressionForce,
                    formula: "F_comp,new = F_comp,current (kept constant for consistent tablet hardness)"
                });
            }
            break;

        case "Coating":
            {
                const currentSprayRate = input.sprayRate || 120;
                const recommendedSprayRate = currentSprayRate * Math.pow(scaleFactor, 2/3);
                 output.recommendedParameters.push({
                    name: "Spray Rate",
                    currentValue: currentSprayRate,
                    recommendedValue: recommendedSprayRate.toFixed(2),
                    unit: DUMMY_UNITS.sprayRate,
                    formula: `SR_new = SR_current * scaleFactor^(2/3) = ${currentSprayRate} * ${scaleFactor.toFixed(2)}^(2/3)`
                });

                const currentBedSpeed = input.bedSpeed || 8;
                const recommendedBedSpeed = currentBedSpeed / Math.pow(scaleFactor, 1/3);
                 output.recommendedParameters.push({
                    name: "Bed Speed",
                    currentValue: currentBedSpeed,
                    recommendedValue: recommendedBedSpeed.toFixed(2),
                    unit: DUMMY_UNITS.bedSpeed,
                    formula: `RPM_bed,new = RPM_current / scaleFactor^(1/3) = ${currentBedSpeed} / ${scaleFactor.toFixed(2)}^(1/3)`
                });
            }
            break;
        
        case "Blending":
            {
                const currentBlendingTime = input.blendingTime || 15;
                const recommendedBlendingTime = currentBlendingTime * Math.pow(scaleFactor, 0.15);
                 output.recommendedParameters.push({
                    name: "Blending Time",
                    currentValue: currentBlendingTime,
                    recommendedValue: recommendedBlendingTime.toFixed(2),
                    unit: DUMMY_UNITS.blendingTime,
                    formula: `T_blend,new = T_blend,current * scaleFactor^0.15 = ${currentBlendingTime} * ${scaleFactor.toFixed(2)}^0.15`
                });

                const currentBlenderSpeed = input.blenderSpeed || 20;
                const recommendedBlenderSpeed = currentBlenderSpeed;
                 output.recommendedParameters.push({
                    name: "Blender Speed",
                    currentValue: currentBlenderSpeed,
                    recommendedValue: recommendedBlenderSpeed.toFixed(2),
                    unit: DUMMY_UNITS.blenderSpeed,
                    formula: "RPM_blender,new = RPM_blender,current (tip speed kept constant)"
                });
            }
            break;

        case "Milling":
        case "Sifting":
            {
                const currentMillSpeed = input.millSpeed || 3000;
                const recommendedMillSpeed = currentMillSpeed * Math.sqrt(scaleFactor); // Make it scale
                 output.recommendedParameters.push({
                    name: "Mill Speed",
                    currentValue: currentMillSpeed,
                    recommendedValue: recommendedMillSpeed.toFixed(2),
                    unit: DUMMY_UNITS.millSpeed,
                    formula: `RPM_mill,new = RPM_mill,current * sqrt(scaleFactor) = ${currentMillSpeed} * sqrt(${scaleFactor.toFixed(2)})`
                });
                
                const currentScreenSize = input.screenSize || 500;
                const recommendedScreenSize = currentScreenSize;
                 output.recommendedParameters.push({
                    name: "Screen Size",
                    currentValue: currentScreenSize,
                    recommendedValue: recommendedScreenSize.toFixed(2),
                    unit: DUMMY_UNITS.screenSize,
                    formula: "ScreenSize_new = ScreenSize_current (kept constant for consistent particle size)"
                });
            }
            break;
        
        case "Roll Compaction":
             {
                const currentRollForce = input.rollForce || 10;
                const recommendedRollForce = currentRollForce;
                 output.recommendedParameters.push({
                    name: "Roll Force",
                    currentValue: currentRollForce,
                    recommendedValue: recommendedRollForce.toFixed(2),
                    unit: DUMMY_UNITS.rollForce,
                    formula: "F_roll,new = F_roll,current (kept constant for ribbon consistency)"
                });

                const currentRollSpeed = input.rollSpeed || 5;
                const recommendedRollSpeed = currentRollSpeed * Math.sqrt(scaleFactor);
                 output.recommendedParameters.push({
                    name: "Roll Speed",
                    currentValue: currentRollSpeed,
                    recommendedValue: recommendedRollSpeed.toFixed(2),
                    unit: DUMMY_UNITS.rollSpeed,
                    formula: `RPM_roll,new = RPM_roll,current * sqrt(scaleFactor) = ${currentRollSpeed} * sqrt(${scaleFactor.toFixed(2)})`
                });
            }
            break;

    }

    // Add some dummy constraints that are more likely to trigger
    if (output.recommendedParameters.some(p => p.name === 'Mill Speed' && parseFloat(p.recommendedValue as string) > 8000)) {
        output.constraints.push("Warning: Recommended Mill Speed exceeds 8000 RPM. Please verify equipment limits.");
    }
     if (input.market === "EU") {
        output.constraints.push("Reminder: Ensure compliance with EMA guidelines for scale-up studies (e.g., Annex 15).");
    }
    if (scaleFactor > 20) {
        output.constraints.push("High scale-factor (>20x) detected. Consider an intermediate scaling step to de-risk the process.");
    }


    return output;
}
