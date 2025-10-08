
export type PredictionInput = {
    productName: string;
    unitOperation: "Top Spray Granulation" | "Wet Granulation" | "Compression" | "Coating";
    category: "Lab → Pilot" | "Pilot → Plant 1" | "Plant 1 → Plant 2";
    strength: number;
    scaleSelection: "Scale 2" | "Scale 3" | "Scale 4";
    sprayRate?: number;
    binderPercentage?: number;
    inletTemp?: number;
    outletTemp?: number;
    panSpeed?: number;
    nozzlePosition?: number;
    turretSpeed?: number;
    numberOfPunches?: number;
    compressionForce?: number;
    bedSpeed?: number;
    atomizationPressure?: number;
};

export type PredictionOutput = {
    targetScale: string;
    recommendedParameters: {
        name: string;
        currentValue: number | string;
        recommendedValue: number | string;
        unit: string;
    }[];
    constraints: string[];
};

// Simplified scaling factors for demonstration. A real app would use complex models.
const SCALE_FACTORS = {
    "Lab → Pilot": 10,
    "Pilot → Plant 1": 5,
    "Plant 1 → Plant 2": 2,
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
};

/**
 * Calculates the scaled-up parameters based on the input.
 * This is a deterministic function using simplified process engineering models.
 */
export function calculateScaleUp(input: PredictionInput): PredictionOutput {
    const scaleFactor = SCALE_FACTORS[input.category];
    const output: PredictionOutput = {
        targetScale: input.scaleSelection,
        recommendedParameters: [],
        constraints: [],
    };

    switch (input.unitOperation) {
        case "Top Spray Granulation":
        case "Wet Granulation":
            {
                const currentSprayRate = input.sprayRate || 100;
                // Simple linear scaling for spray rate
                const recommendedSprayRate = currentSprayRate * Math.sqrt(scaleFactor);
                output.recommendedParameters.push({
                    name: "Spray Rate",
                    currentValue: currentSprayRate,
                    recommendedValue: recommendedSprayRate.toFixed(2),
                    unit: DUMMY_UNITS.sprayRate,
                });

                const currentInletTemp = input.inletTemp || 60;
                // Temperature often stays constant or increases slightly
                const recommendedInletTemp = currentInletTemp * 1.05;
                output.recommendedParameters.push({
                    name: "Inlet Temp",
                    currentValue: currentInletTemp,
                    recommendedValue: recommendedInletTemp.toFixed(2),
                    unit: DUMMY_UNITS.inletTemp,
                });

                const currentPanSpeed = input.panSpeed || 10;
                // Pan speed often decreases to maintain Froude number
                const recommendedPanSpeed = currentPanSpeed / Math.sqrt(scaleFactor);
                 output.recommendedParameters.push({
                    name: "Pan Speed",
                    currentValue: currentPanSpeed,
                    recommendedValue: recommendedPanSpeed.toFixed(2),
                    unit: DUMMY_UNITS.panSpeed,
                });
            }
            break;

        case "Compression":
            {
                const currentTurretSpeed = input.turretSpeed || 25;
                // Maintain dwell time, so speed might decrease with more punches
                const recommendedTurretSpeed = currentTurretSpeed * 0.9;
                output.recommendedParameters.push({
                    name: "Turret Speed",
                    currentValue: currentTurretSpeed,
                    recommendedValue: recommendedTurretSpeed.toFixed(2),
                    unit: DUMMY_UNITS.turretSpeed,
                });

                const currentCompressionForce = input.compressionForce || 15;
                // Compression force should remain constant for same tablet hardness
                const recommendedCompressionForce = currentCompressionForce;
                 output.recommendedParameters.push({
                    name: "Compression Force",
                    currentValue: currentCompressionForce,
                    recommendedValue: recommendedCompressionForce.toFixed(2),
                    unit: DUMMY_UNITS.compressionForce,
                });
            }
            break;

        case "Coating":
            {
                const currentSprayRate = input.sprayRate || 120;
                 // Linear scaling based on surface area (approx. scaleFactor^(2/3))
                const recommendedSprayRate = currentSprayRate * Math.pow(scaleFactor, 2/3);
                 output.recommendedParameters.push({
                    name: "Spray Rate",
                    currentValue: currentSprayRate,
                    recommendedValue: recommendedSprayRate.toFixed(2),
                    unit: DUMMY_UNITS.sprayRate,
                });

                const currentBedSpeed = input.bedSpeed || 8;
                // Bed speed may decrease to ensure proper mixing
                const recommendedBedSpeed = currentBedSpeed / Math.pow(scaleFactor, 1/3);
                 output.recommendedParameters.push({
                    name: "Bed Speed",
                    currentValue: currentBedSpeed,
                    recommendedValue: recommendedBedSpeed.toFixed(2),
                    unit: DUMMY_UNITS.bedSpeed,
                });
            }
            break;
    }

    // Add some dummy constraints
    if (output.recommendedParameters.some(p => parseFloat(p.recommendedValue as string) > 500)) {
        output.constraints.push("A recommended value exceeds the typical operational limit of 500. Please verify equipment capacity.");
    }
     if (input.market === "EU") {
        output.constraints.push("Ensure compliance with EMA guidelines for scale-up studies (e.g., Annex 15).");
    }


    return output;
}
