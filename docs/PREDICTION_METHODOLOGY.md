# Enhanced Scale-Up Predictor: MVP-Level Formulas

This document outlines the mathematical models and assumptions used by the Paramanu Scale-Up Predictor. The calculations are based on established process engineering principles and physics-informed models for pharmaceutical manufacturing scale-up.

## 1. Inputs

The following inputs are considered for the prediction models:

-   **currentParam**: Current batch or process parameters from the existing scale.
-   **scaleFactor**: The batch size multiplier based on the selected category (e.g., Lab → Pilot, Pilot → Plant 1).
-   **materialProperties**: Optional properties of the material, such as bulk density, particle size, and flowability. Represented as a correction factor `CF_material`.
-   **equipmentProperties**: Optional properties of the equipment, like pan/blender diameter, nozzle size, and operational limits. Represented as a correction factor `CF_equipment`.
-   **empiricalCorrection**: An optional factor (typically 1.0–1.2) derived from historical data of previous batches to fine-tune predictions.

---

## 2. Unit Operation Models

### Granulation (Top-Spray, Bottom-Spray, Powder Layering)

**Goal**: Maintain similar granule size, moisture content, and flow properties.

**Physics-informed formulas:**

-   **New Spray Rate (`SR_new`)**:
    ```
    SR_new = SR_current * sqrt(scaleFactor) * CF_material * CF_equipment
    ```
-   **New Inlet Temperature (`T_in,new`)**:
    ```
    T_in,new = min(T_in,current * 1.05 * CF_material, T_max)
    ```
-   **New Pan Speed (`ω_new`)**:
    ```
    ω_new = sqrt((g * Fr_current) / R_new)
    ```
    -   `Fr` is the Froude number of the pan or Wurster.
    -   `R_new` is the new pan/blender radius.

**Notes**:
-   Spray rate scales with the square root of the scale factor, adjusted for material properties and equipment (e.g., nozzle size).
-   Inlet temperature is adjusted slightly and capped at the equipment's maximum operating temperature.
-   Pan speed is adjusted to maintain the same Froude number, ensuring similar powder movement.

### Wet Granulation (High Shear)

**Goal**: Achieve consistent granule density and size.

-   **New Impeller Speed (`RPM_new`)**:
    ```
    RPM_new = RPM_current * 0.9 * CF_material
    ```
-   **New Wet Massing Time (`T_mass,new`)**:
    ```
    T_mass,new = T_mass,current * scaleFactor^0.15 * CF_material
    ```
-   **Alternative based on Tip Speed**: To maintain geometric similarity, the impeller tip velocity can be kept constant:
    ```
    V_tip,new = V_tip,current
    where V_tip = π * D_impeller * RPM_new
    ```

### Compression

**Goal**: Maintain tablet hardness and density.

-   **New Turret Speed (`RPM_turret,new`)**:
    ```
    RPM_turret,new = RPM_current * 0.9
    ```
-   **New Compression Force (`F_comp,new`)**:
    ```
    F_comp,new = F_comp,current  (kept constant)
    ```
-   **Optional Dwell Time Adjustment**:
    ```
    dwell_new = dwell_current / scaleFactor^0.05
    ```

### Coating

**Goal**: Maintain coating uniformity and efficiency.

-   **New Spray Rate (`SR_new`)**:
    ```
    SR_new = SR_current * scaleFactor^(2/3) * CF_material
    ```
-   **New Bed Speed (`RPM_bed,new`)**:
    ```
    RPM_bed,new = RPM_current / scaleFactor^(1/3)
    ```
**Notes**: Must include constraints for maximum spray capacity and pan speed limits.

### Blending

**Goal**: Maintain blend uniformity.

-   **New Blending Time (`T_blend,new`)**:
    ```
    T_blend,new = T_blend,current * scaleFactor^0.15 * CF_material
    ```
-   **New Blender Speed (`RPM_blender,new`)**:
    ```
    RPM_blender,new = RPM_current (to keep tip speed constant)
    ```
-   **Optional Tip Speed Calculation**:
    ```
    V_tip,new = π * D_blender,new * RPM_blender,new
    ```

### Milling & Sifting

**Goal**: Maintain particle size distribution.

-   **New Mill Speed (`RPM_mill,new`)**:
    ```
    RPM_mill,new = RPM_current (to maintain tip speed)
    ```
-   **New Screen Size (`ScreenSize_new`)**:
    ```
    ScreenSize_new = ScreenSize_current (kept constant)
    ```
-   **Optional Feed Rate Adjustment**:
    ```
    FeedRate_new = FeedRate_current * scaleFactor
    ```

### Roll Compaction

**Goal**: Create ribbons of consistent density and thickness.

-   **New Roll Force (`F_roll,new`)**:
    ```
    F_roll,new = F_roll,current (kept constant)
    ```
-   **New Roll Speed (`RPM_roll,new`)**:
    ```
    RPM_roll,new = RPM_current * sqrt(scaleFactor)
    ```
-   **Optional Gap Ratio Check**: To maintain similarity, the dimensionless gap ratio can be checked:
    ```
    GapRatio = RollGap / RollDiameter
    ```

---

## 9. Implementation Notes for MVP

1.  **Empirical Correction Factors (CF)**: For the MVP, all correction factors (`CF_material`, `CF_equipment`) will start with a default value of `1.0`. Future iterations can allow users to update these based on actual batch data.
2.  **Equipment Constraints**: All calculated outputs should be capped at the equipment's specified minimum and maximum operating limits.
3.  **Sanity Checks**: The system should flag any recommended parameters that are physically infeasible (e.g., a spray rate exceeding the maximum capacity of the equipment).
4.  **Input Flexibility**: The UI should allow for optional input of material and equipment properties to improve the accuracy of predictions.
5.  **Output Clarity**: The results should clearly distinguish between parameters that are critical and should remain constant (e.g., Compression Force) versus those that are adjusted for scaling.
