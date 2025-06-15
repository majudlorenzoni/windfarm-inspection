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

export const getTowerAlerts = (tower: any): string[] => {
  const alerts: string[] = [];

  const latest = tower.scada_data?.[tower.scada_data.length - 1];
  const vib = tower.bearing_vibration?.amplitude ?? 0;
  const drivetrain = tower.structural_vibration_signals?.drivetrain ?? [];
  const stress = tower.tower_stress_measurements?.stress ?? 0;
  const genTemp = latest?.generator_temperature ?? 0;

  if (genTemp > 80) alerts.push("temperature");

  const hasBearingVib = vib > 0.1;
  const hasDrivetrainVib = drivetrain.some(v => v > 0.1);

  if (hasBearingVib || hasDrivetrainVib) {
    alerts.push("bearing_vibration"); 
  }

  if (stress > 250) alerts.push("stress");

  if (
    tower.logs?.some(log =>
      ["failure", "shutdown", "misalignment"].some(keyword =>
        log.event.toLowerCase().includes(keyword)
      )
    )
  ) alerts.push("log");

  return alerts;
};

export const getAlertMessages = (turbineData: Record<string, any>): string[] => {
  const alerts = getTowerAlerts(turbineData);
  
  if (alerts.length === 0) {
    return ['Turbina operando normalmente.'];
  }

  return alerts.map(alert => {
    switch (alert) {
      case 'temperature':
        return 'Turbina com temperatura acima do normal.';
      case 'bearing_vibration':
        return 'Vibração elevada detectada no rolamento.';
      case 'stress':
        return 'Estresse estrutural elevado.';
      case 'log':
        return 'Falha registrada nos logs.';
      default:
        return 'Alerta desconhecido.';
    }
  });
};