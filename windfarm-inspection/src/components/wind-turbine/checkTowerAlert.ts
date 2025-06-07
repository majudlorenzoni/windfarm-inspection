export const checkIfTowerHasAlert = (tower: any): boolean => {
  const latest = tower.scada_data?.[tower.scada_data.length - 1];
  const vib = tower.bearing_vibration?.amplitude ?? 0;
  const drivetrain = tower.structural_vibration_signals?.drivetrain ?? [];
  const stress = tower.tower_stress_measurements?.stress ?? 0;
  const genTemp = latest?.generator_temperature ?? 0;

  return (
    genTemp > 80 ||
    vib > 0.1 ||
    drivetrain.some(v => v > 0.1) ||
    stress > 250 ||
    tower.logs?.some(log =>
      ["failure", "shutdown", "misalignment"].some(keyword =>
        log.event.toLowerCase().includes(keyword)
      )
    )
  );
};
