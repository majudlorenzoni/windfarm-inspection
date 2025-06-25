export const checkIfTowerHasAlert = (tower: any): boolean => {
  const latest = tower.scada_data?.[tower.scada_data.length - 1];
  const vib = tower.bearing_vibration?.amplitude ?? 0;
  const drivetrain = tower.structural_vibration_signals?.drivetrain ?? [];
  const stress = tower.tower_stress_measurements?.stress ?? 0;
  const genTemp = latest?.generator_temperature ?? 0;

  const hasFailureLog = tower.logs?.some(log =>
    ["failure", "shutdown", "misalignment"].some(keyword =>
      log.event.toLowerCase().includes(keyword)
    )
  ) ?? false;

  return (
    genTemp > 80 ||
    vib > 0.1 ||
    drivetrain.some(v => v > 0.1) ||
    stress > 250 ||
    hasFailureLog
  );
};

export const hasVibrationAlert = (tower: any): boolean => {
  const vib = tower.bearing_vibration?.amplitude ?? 0;
  return vib > 0.1;
};

export const isSensorFailing = (tower: any) => {
  const vib = tower.bearing_vibration?.amplitude;
  const drivetrain = tower.structural_vibration_signals?.drivetrain ?? [];
  const stress = tower.tower_stress_measurements?.stress;
  const latest = tower.scada_data?.[tower.scada_data.length - 1];
  const genTemp = latest?.generator_temperature;

  // Exemplo simples de sensores "travados" ou com valores inválidos:
  const vibInvalid = vib === null || vib === undefined || vib < 0;
  const drivetrainInvalid = drivetrain.some(v => v === null || v === undefined || v < 0);
  const stressInvalid = stress === null || stress === undefined || stress < 0;
  const genTempInvalid = genTemp === null || genTemp === undefined || genTemp < 0;

  // Pode adicionar mais regras conforme seu conhecimento do sensor

  return vibInvalid || drivetrainInvalid || stressInvalid || genTempInvalid;
};


export const checkIfTowerHasAllAlerts = (tower: any): boolean => {
  const latest = tower.scada_data?.[tower.scada_data.length - 1];
  const vib = tower.bearing_vibration?.amplitude ?? 0;
  const drivetrain = tower.structural_vibration_signals?.drivetrain ?? [];
  const stress = tower.tower_stress_measurements?.stress ?? 0;
  const genTemp = latest?.generator_temperature ?? 0;

  const hasFailureLog = tower.logs?.some(log =>
    ["failure", "shutdown", "misalignment"].some(keyword =>
      log.event.toLowerCase().includes(keyword)
    )
  ) ?? false;

  return (
    genTemp > 80 &&
    vib > 0.1 &&
    drivetrain.every(v => v > 0.1) && // ou drivetrain.some, conforme regra desejada
    stress > 250 &&
    hasFailureLog
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