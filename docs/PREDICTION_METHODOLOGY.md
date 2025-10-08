# Scale-Up Predictor: Calculation Methodology

This document outlines the mathematical models and assumptions used by the Paramanu Scale-Up Predictor to generate recommended process parameters. The calculations are based on established process engineering principles for pharmaceutical manufacturing scale-up.

**Note:** These models are simplified for demonstration purposes. A production-grade system would employ more sophisticated, data-driven, and validated models.

## 1. Core Scaling Factors

The primary driver for scaling is the batch size increase from one scale to the next. The predictor uses the following multipliers based on the selected "Category":

| Category            | Scale Factor |
| ------------------- | ------------ |
| Lab → Pilot         | 10x          |
| Pilot → Plant 1     | 5x           |
| Plant 1 → Plant 2   | 2x           |

This `scaleFactor` is used in the formulas for individual unit operations.

---

## 2. Unit Operation Models

The following sections detail the formulas used for each unit operation.

### Granulation (Top Spray, Bottom Spray/Wurster, Powder Layering)

The goal is to maintain similar granule characteristics by adjusting parameters to handle the larger volume.

-   **Spray Rate (`SR`)**: Scaled to accommodate the larger batch size. A common approach is to scale with the square root of the scale factor to approximate the relationship between volume and process time.
    -   `new_SR = current_SR * sqrt(scaleFactor)`

-   **Inlet Temperature (`T_in`)**: Increased slightly to provide sufficient energy for drying the larger mass.
    -   `new_T_in = current_T_in * 1.05`

-   **Pan Speed (`PS`)**: Often decreased to maintain a constant Froude number (a dimensionless number comparing centrifugal force to gravitational force), ensuring similar powder movement and mixing dynamics.
    -   `new_PS = current_PS / sqrt(scaleFactor)`

### Wet Granulation (High Shear)

-   **RMG Speed (`RPM`)**: Similar to pan speed, impeller speed is adjusted. Here it's slightly decreased.
    -   `new_RPM = current_RPM * 0.9` (Simplified assumption)

-   **Wet Massing Time (`T_mass`)**: Time is slightly increased to ensure homogenous liquid distribution in the larger powder mass.
    -   `new_T_mass = current_T_mass * scaleFactor ^ 0.15`

### Compression

The objective is to produce tablets with the same hardness and weight, which means keeping forces constant but adjusting for throughput.

-   **Turret Speed (`RPM`)**: Often decreased slightly to maintain sufficient dwell time (the time the punch head is in contact with the compression roll), which is critical for tablet compaction.
    -   `new_RPM = current_RPM * 0.9`

-   **Compression Force (`F_comp`)**: This should remain **constant** to achieve the same tablet density and hardness.
    -   `new_F_comp = current_F_comp`

### Coating

Scaling coating processes involves maintaining thermodynamic and spraying efficiency.

-   **Spray Rate (`SR`)**: The total surface area of the tablets scales approximately with `scaleFactor^(2/3)`. The spray rate is scaled accordingly to maintain coating uniformity.
    -   `new_SR = current_SR * scaleFactor ^ (2/3)`

-   **Bed Speed (`RPM`)**: The pan speed is often reduced to ensure tablets pass through the spray zone effectively without causing attrition. This scales with the inverse of the cube root of the scale factor, related to the change in pan diameter.
    -   `new_RPM = current_RPM / scaleFactor ^ (1/3)`

### Blending

The goal is to achieve blend uniformity in a larger volume.

-   **Blending Time (`T_blend`)**: The time required increases non-linearly with batch size.
    -   `new_T_blend = current_T_blend * scaleFactor ^ 0.15`

-   **Blender Speed (`RPM`)**: A critical parameter is the tip speed of the blender, which should be kept **constant** to ensure similar shear and mixing dynamics. Therefore, the RPM is assumed to remain constant for geometrically similar blenders.
    -   `new_RPM = current_RPM`

### Milling & Sifting

Throughput is the primary concern while maintaining particle size distribution.

-   **Mill Speed (`RPM`)**: Like blending, the tip speed of the mill is often the critical parameter and is kept **constant**.
    -   `new_RPM = current_RPM`

-   **Screen Size**: To achieve the same particle size distribution, the screen size should remain **constant**.
    -   `new_ScreenSize = current_ScreenSize`

### Roll Compaction

The goal is to create ribbons of consistent density and thickness.

-   **Roll Force (`F_roll`)**: This is a critical parameter that directly impacts ribbon density. It should be kept **constant**.
    -   `new_F_roll = current_F_roll`

-   **Roll Speed (`RPM`)**: Speed can be increased to manage the higher throughput required for a larger batch.
    -   `new_RPM = current_RPM * sqrt(scaleFactor)`

---

This document serves as a high-level guide to the logic embedded in the Scale-Up Predictor. For real-world applications, these models should be replaced or supplemented with empirical data and more complex simulations.