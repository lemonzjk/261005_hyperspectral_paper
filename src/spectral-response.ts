export type Material = "vegetation" | "rock" | "water";

// Analytical examples, not measured reflectance or material identification results.
export function response(material: Material, wavelength: number) {
  if (material === "vegetation")
    return (
      0.09 +
      0.12 * Math.exp(-(((wavelength - 550) / 42) ** 2)) +
      0.64 / (1 + Math.exp(-(wavelength - 720) / 16))
    );
  if (material === "water")
    return 0.04 + 0.15 * Math.exp(-(((wavelength - 490) / 95) ** 2));
  return 0.3 + 0.00055 * (wavelength - 450) + 0.05 * Math.sin(wavelength / 105);
}
