import { useState, useEffect, useRef } from 'react';
import { CreateInspectionFormContainer } from './styles';
import { saveInspection } from '../../../utils/saveInspection';
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../../firebase';
import { useWindData } from '../../../components/windDataContext';

type ScadaData = {
  timestamp: string;
  wind_speed: number;
  power_output: number;
  nacelle_direction: number;
  rotor_speed: number;
  ambient_temperature: number;
  generator_temperature: number;
};

type Metadata = {
  first_timestamp: string;
  last_timestamp: string;
  num_datapoints: number;
  missing_datapoints: number;
  uptime_percent: number;
  energy_total_mwh: number;
  capacity_factor: number;
  flh: number;
  num_log_entries: number;
};

type LogEntry = {
  timestamp: string;
  event: string;
};

type Annotation = {
  timestamp: string;
  note: string;
};

type StandardPowerPoint = {
  wind_speed: number;
  expected_power_output: number;
};

type StructuralVibrationSignals = {
  timestamp: string;
  tower_base: number[];
  drivetrain: number[];
};

type VibrationFrequencySpectrum = {
  timestamp: string;
  frequencies: number[];
  amplitudes: number[];
};

type BearingVibration = {
  timestamp: string;
  amplitude: number;
};

type TowerStressMeasurements = {
  timestamp: string;
  strain: number;
  stress: number;
};

type MaintenanceLogItem = {
  date: string;
  description: string;
  technician: string;
};

type SensorSamplingInterval = {
  scada: string;
  vibration: string;
};

type AccelerometerDataLocation = {
  tower_base: string;
  drivetrain: string;
};

type Tower = {
  id: string;
  scada_data: ScadaData[];
  metadata: Metadata;
  logs: LogEntry[];
  annotations: Annotation[];
  standard_power_curve: StandardPowerPoint[];
  structural_vibration_signals: StructuralVibrationSignals;
  vibration_frequency_spectrum: VibrationFrequencySpectrum;
  bearing_vibration: BearingVibration;
  tower_stress_measurements: TowerStressMeasurements;
  maintenance_log: MaintenanceLogItem[];
  sensor_sampling_interval: SensorSamplingInterval;
  accelerometer_data_location: AccelerometerDataLocation;
};

type WindData = {
  towers: Tower[];
};


export const CreateInspectionForm = ({
  onCreate,
  onCancel,
}: {
  onCreate: (data: WindData) => void;
  onCancel: () => void;
}) => {
  const [localWindData, setLocalWindData] = useState<WindData | null>(null); // <-- agora local
  const navigate = useNavigate()
  const { setWindData } = useWindData();

  const [towers, setTowers] = useState<Tower[]>([
    {
      id: 'Torre 1',
      scada_data: [],
      metadata: {
        first_timestamp: '',
        last_timestamp: '',
        num_datapoints: 0,
        missing_datapoints: 0,
        uptime_percent: 100,
        energy_total_mwh: 0,
        capacity_factor: 0,
        flh: 0,
        num_log_entries: 0,
      },
      logs: [],
      annotations: [],
      standard_power_curve: [],
      structural_vibration_signals: {
        timestamp: '',
        tower_base: [],
        drivetrain: [],
      },
      vibration_frequency_spectrum: {
        timestamp: '',
        frequencies: [],
        amplitudes: [],
      },
      bearing_vibration: {
        timestamp: '',
        amplitude: 0,
      },
      tower_stress_measurements: {
        timestamp: '',
        strain: 0,
        stress: 0,
      },
      maintenance_log: [],
      sensor_sampling_interval: {
        scada: '',
        vibration: '',
      },
      accelerometer_data_location: {
        tower_base: '',
        drivetrain: '',
      },
    },
  ]);

  const towerCounter = useRef(2);

  const addTower = () => {
    const newId = `Torre ${towerCounter.current}`;
    towerCounter.current += 1;

    setTowers((prev) => [
      ...prev,
      {
        id: newId,
        scada_data: [],
        metadata: {
          first_timestamp: '',
          last_timestamp: '',
          num_datapoints: 0,
          missing_datapoints: 0,
          uptime_percent: 100,
          energy_total_mwh: 0,
          capacity_factor: 0,
          flh: 0,
          num_log_entries: 0,
        },
        logs: [],
        annotations: [],
        standard_power_curve: [],
        structural_vibration_signals: {
          timestamp: '',
          tower_base: [],
          drivetrain: [],
        },
        vibration_frequency_spectrum: {
          timestamp: '',
          frequencies: [],
          amplitudes: [],
        },
        bearing_vibration: {
          timestamp: '',
          amplitude: 0,
        },
        tower_stress_measurements: {
          timestamp: '',
          strain: 0,
          stress: 0,
        },
        maintenance_log: [],
        sensor_sampling_interval: {
          scada: '',
          vibration: '',
        },
        accelerometer_data_location: {
          tower_base: '',
          drivetrain: '',
        },
      },
    ]);
  };

  const removeTower = (towerIndex: number) => {
    setTowers(towers.filter((_, i) => i !== towerIndex));
  };

  // SCADA DATA
  const updateScadaData = (
    towerIndex: number,
    dataIndex: number,
    field: keyof ScadaData,
    value: any
  ) => {
    const newTowers = [...towers];
    newTowers[towerIndex].scada_data[dataIndex] = {
      ...newTowers[towerIndex].scada_data[dataIndex],
      [field]: value,
    };
    setTowers(newTowers);
  };
  const addScadaData = (towerIndex: number, newScada: ScadaData) => {
    const newTowers = [...towers];
    newTowers[towerIndex].scada_data.push(newScada);
    setTowers(newTowers);
  };
  const removeScadaData = (towerIndex: number, dataIndex: number) => {
    const newTowers = [...towers];
    newTowers[towerIndex].scada_data.splice(dataIndex, 1);
    setTowers(newTowers);
  };

  // LOGS
  const updateLog = (
    towerIndex: number,
    logIndex: number,
    field: keyof LogEntry,
    value: any
  ) => {
    const newTowers = [...towers];
    newTowers[towerIndex].logs[logIndex] = {
      ...newTowers[towerIndex].logs[logIndex],
      [field]: value,
    };
    setTowers(newTowers);
  };
  const addLog = (towerIndex: number, newLog: LogEntry) => {
    const newTowers = [...towers];
    newTowers[towerIndex].logs.push(newLog);
    setTowers(newTowers);
  };
  const removeLog = (towerIndex: number, logIndex: number) => {
    const newTowers = [...towers];
    newTowers[towerIndex].logs.splice(logIndex, 1);
    setTowers(newTowers);
  };

  // ANNOTATIONS
  const updateAnnotation = (
    towerIndex: number,
    annotationIndex: number,
    field: keyof Annotation,
    value: any
  ) => {
    const newTowers = [...towers];
    newTowers[towerIndex].annotations[annotationIndex] = {
      ...newTowers[towerIndex].annotations[annotationIndex],
      [field]: value,
    };
    setTowers(newTowers);
  };
  const addAnnotation = (towerIndex: number, newAnnotation: Annotation) => {
    const newTowers = [...towers];
    newTowers[towerIndex].annotations.push(newAnnotation);
    setTowers(newTowers);
  };
  const removeAnnotation = (towerIndex: number, annotationIndex: number) => {
    const newTowers = [...towers];
    newTowers[towerIndex].annotations.splice(annotationIndex, 1);
    setTowers(newTowers);
  };

  // METADATA
  const updateMetadata = (towerIndex: number, field: keyof Metadata, value: any) => {
    const newTowers = [...towers];
    newTowers[towerIndex].metadata = {
      ...newTowers[towerIndex].metadata,
      [field]: value,
    };
    setTowers(newTowers);
  };

  // --- NOVOS CAMPOS ---

  // Standard Power Curve
  const updateStandardPowerCurve = (
    towerIndex: number,
    pointIndex: number,
    field: 'wind_speed' | 'expected_power_output',
    value: number
  ) => {
    const newTowers = [...towers];
    const curve = newTowers[towerIndex].standard_power_curve || [];
    const updatedPoint = { ...curve[pointIndex], [field]: value };
    curve[pointIndex] = updatedPoint;
    newTowers[towerIndex].standard_power_curve = curve;
    setTowers(newTowers);
  };
  const addStandardPowerPoint = (towerIndex: number) => {
    const newTowers = [...towers];
    if (!newTowers[towerIndex].standard_power_curve) newTowers[towerIndex].standard_power_curve = [];
    newTowers[towerIndex].standard_power_curve.push({ wind_speed: 0, expected_power_output: 0 });
    setTowers(newTowers);
  };
  const removeStandardPowerPoint = (towerIndex: number, pointIndex: number) => {
    const newTowers = [...towers];
    const curve = newTowers[towerIndex].standard_power_curve || [];
    curve.splice(pointIndex, 1);
    newTowers[towerIndex].standard_power_curve = curve;
    setTowers(newTowers);
  };

const updateStructuralVibrationSignals = (
  towerIndex: number,
  field: 'timestamp' | 'tower_base' | 'drivetrain',
  value: string | number[]
) => {
  const newTowers = [...towers];
  const signals = { ...newTowers[towerIndex].structural_vibration_signals };

  if (field === 'timestamp') {
    // campo timestamp é string
    signals.timestamp = value as string;
  } else if (field === 'tower_base' || field === 'drivetrain') {
    // esses campos são number[]
    if (typeof value === 'string') {
      signals[field] = value
        .split(',')
        .map((v) => parseFloat(v.trim()))
        .filter((v) => !isNaN(v));
    } else {
      signals[field] = value;
    }
  }

  newTowers[towerIndex].structural_vibration_signals = signals;
  setTowers(newTowers);
};

const updateVibrationFrequencySpectrum = (
  towerIndex: number,
  field: 'timestamp' | 'frequencies' | 'amplitudes',
  value: string | number[]
) => {
  const newTowers = [...towers];
  const spectrum = { ...newTowers[towerIndex].vibration_frequency_spectrum };

  if (field === 'timestamp') {
    spectrum.timestamp = value as string;
  } else if (field === 'frequencies' || field === 'amplitudes') {
    if (typeof value === 'string') {
      spectrum[field] = value
        .split(',')
        .map((v) => parseFloat(v.trim()))
        .filter((v) => !isNaN(v));
    } else {
      spectrum[field] = value;
    }
  }

  newTowers[towerIndex].vibration_frequency_spectrum = spectrum;
  setTowers(newTowers);
};

  const updateBearingVibration = (
    towerIndex: number,
    field: 'timestamp' | 'amplitude',
    value: string | number
  ) => {
    const newTowers = [...towers];
    const bearing = { ...newTowers[towerIndex].bearing_vibration };
    if (field === 'amplitude') {
      bearing[field] = Number(value);
    } else {
      bearing[field] = value as string;
    }
    newTowers[towerIndex].bearing_vibration = bearing;
    setTowers(newTowers);
  };

  // Tower Stress Measurements
  const updateTowerStressMeasurements = (
    towerIndex: number,
    field: 'timestamp' | 'strain' | 'stress',
    value: string | number
  ) => {
    const newTowers = [...towers];
    const stress = { ...newTowers[towerIndex].tower_stress_measurements };
    if (field === 'strain' || field === 'stress') {
      stress[field] = Number(value);
    } else {
      stress[field] = value as string;
    }
    newTowers[towerIndex].tower_stress_measurements = stress;
    setTowers(newTowers);
  };

  // Sensor Sampling Interval
  const updateSensorSamplingInterval = (
    towerIndex: number,
    field: 'scada' | 'vibration',
    value: string
  ) => {
    const newTowers = [...towers];
    const interval = { ...newTowers[towerIndex].sensor_sampling_interval };
    interval[field] = value;
    newTowers[towerIndex].sensor_sampling_interval = interval;
    setTowers(newTowers);
  };

  // Accelerometer Data Location
  const updateAccelerometerDataLocation = (
    towerIndex: number,
    field: 'tower_base' | 'drivetrain',
    value: string
  ) => {
    const newTowers = [...towers];
    const location = { ...newTowers[towerIndex].accelerometer_data_location };
    location[field] = value;
    newTowers[towerIndex].accelerometer_data_location = location;
    setTowers(newTowers);
  };

  // Temp Inputs State + Setters
  const [tempInputs, setTempInputs] = useState<
    {
      scada: ScadaData;
      log: LogEntry;
      annotation: Annotation;
      standardPowerPoint: { wind_speed: number; expected_power_output: number };
      maintenanceItem: { date: string; description: string; technician: string };
    }[]
  >([]);

  const syncTempInputs = () => {
    if (tempInputs.length !== towers.length) {
      const newTemps = towers.map((t, i) => {
        return (
          tempInputs[i] || {
            scada: {
              timestamp: '',
              wind_speed: 0,
              power_output: 0,
              nacelle_direction: 0,
              rotor_speed: 0,
              ambient_temperature: 0,
              generator_temperature: 0,
            },
            log: { timestamp: '', event: '' },
            annotation: { timestamp: '', note: '' },
            standardPowerPoint: { wind_speed: 0, expected_power_output: 0 },
            maintenanceItem: { date: '', description: '', technician: '' },
          }
        );
      });
      setTempInputs(newTemps);
    }
  };

  useEffect(() => {
    syncTempInputs();
  }, [towers]);

  const setTempScada = (towerIndex: number, newScada: ScadaData) => {
    const newTemps = [...tempInputs];
    newTemps[towerIndex].scada = newScada;
    setTempInputs(newTemps);
  };
  const setTempLog = (towerIndex: number, newLog: LogEntry) => {
    const newTemps = [...tempInputs];
    newTemps[towerIndex].log = newLog;
    setTempInputs(newTemps);
  };
  const setTempAnnotation = (towerIndex: number, newAnnotation: Annotation) => {
    const newTemps = [...tempInputs];
    newTemps[towerIndex].annotation = newAnnotation;
    setTempInputs(newTemps);
  };

  // Submissão final
const handleSubmit = async () => {
    if (towers.length === 0) {
      alert('Adicione ao menos uma torre!');
      return;
    }

    const towersWithUpdatedMetadata = towers.map((tower) => {
      const sortedTimestamps = tower.scada_data.map((d) => d.timestamp).sort();
      return {
        ...tower,
        metadata: {
          ...tower.metadata,
          first_timestamp: sortedTimestamps[0] || '',
          last_timestamp: sortedTimestamps[sortedTimestamps.length - 1] || '',
          num_datapoints: tower.scada_data.length,
          num_log_entries: tower.logs.length,
        },
      };
    });

    const finalData = { towers: towersWithUpdatedMetadata };

    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        alert('Usuário não autenticado. Faça login para salvar.');
        return;
      }

      const inspectionId = await saveInspection(finalData);

      setWindData(finalData);  // <<< atualiza o contexto global aqui

      alert(`Inspeção salva com sucesso! ID: ${inspectionId}`);

      navigate('/windFarm');  // <<< navega para a rota que usa o contexto
    } catch (error) {
      console.error('Erro ao salvar inspeção:', error);
      alert(`Erro ao salvar inspeção: ${error instanceof Error ? error.message : error}`);
    }
  };


  return (
    <CreateInspectionFormContainer>
      
    {towers.length > 0 && (
      <div className="form-wrapper">

      {towers.map((tower, towerIndex) => (
        <fieldset key={tower.id} className="data-section">
           <div className="fieldset-header">
            <legend>{tower.id}</legend>
            <button
              type="button"
              onClick={() => removeTower(towerIndex)}
              className="remove-tower-button"
            >
              <img src="/img/close_red.png" alt="Remover" />
            </button>
          </div>

        {/* SCADA Data */}
        <div className="scada-table-wrapper">
        <h3>Dados SCADA</h3>
        <table className="data-table-scala-vertical">
          <thead>
            <tr>
              {tower.scada_data.map((_, i) => (
                <th key={i}>Entrada {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Timestamp */}
            <tr>
              <td>Timestamp</td>
              {tower.scada_data.map((item, i) => (
                <td key={i}>
                  <input
                    type="datetime-local"
                    className="data-input"
                    value={item.timestamp}
                    onChange={(e) => updateScadaData(towerIndex, i, 'timestamp', e.target.value)}
                  />
                </td>
              ))}
              <td>
                <input
                  type="datetime-local"
                  className="data-input"
                  value={tempInputs[towerIndex]?.scada.timestamp || ''}
                  onChange={(e) =>
                    setTempScada(towerIndex, {
                      ...tempInputs[towerIndex].scada,
                      timestamp: e.target.value,
                    })
                  }
                />
              </td>
            </tr>

            {/* Velocidade Vento */}
            <tr>
              <td>Velocidade Vento (m/s)</td>
              {tower.scada_data.map((item, i) => (
                <td key={i}>
                  <input
                    type="number"
                    className="data-input"
                    value={item.wind_speed}
                    onChange={(e) => updateScadaData(towerIndex, i, 'wind_speed', +e.target.value)}
                  />
                </td>
              ))}
              <td>
                <input
                  type="number"
                  className="data-input"
                  value={tempInputs[towerIndex]?.scada.wind_speed || 0}
                  onChange={(e) =>
                    setTempScada(towerIndex, {
                      ...tempInputs[towerIndex].scada,
                      wind_speed: +e.target.value,
                    })
                  }
                />
              </td>
            </tr>

            {/* Potência */}
            <tr>
              <td>Potência (kW)</td>
              {tower.scada_data.map((item, i) => (
                <td key={i}>
                  <input
                    type="number"
                    className="data-input"
                    value={item.power_output}
                    onChange={(e) => updateScadaData(towerIndex, i, 'power_output', +e.target.value)}
                  />
                </td>
              ))}
              <td>
                <input
                  type="number"
                  className="data-input"
                  value={tempInputs[towerIndex]?.scada.power_output || 0}
                  onChange={(e) =>
                    setTempScada(towerIndex, {
                      ...tempInputs[towerIndex].scada,
                      power_output: +e.target.value,
                    })
                  }
                />
              </td>
            </tr>

            {/* Direção Nacelle */}
            <tr>
              <td>Direção Nacelle</td>
              {tower.scada_data.map((item, i) => (
                <td key={i}>
                  <input
                    type="number"
                    className="data-input"
                    value={item.nacelle_direction}
                    onChange={(e) => updateScadaData(towerIndex, i, 'nacelle_direction', +e.target.value)}
                  />
                </td>
              ))}
              <td>
                <input
                  type="number"
                  className="data-input"
                  value={tempInputs[towerIndex]?.scada.nacelle_direction || 0}
                  onChange={(e) =>
                    setTempScada(towerIndex, {
                      ...tempInputs[towerIndex].scada,
                      nacelle_direction: +e.target.value,
                    })
                  }
                />
              </td>
            </tr>

            {/* Rotor Speed */}
            <tr>
              <td>Rotor Speed</td>
              {tower.scada_data.map((item, i) => (
                <td key={i}>
                  <input
                    type="number"
                    className="data-input"
                    value={item.rotor_speed}
                    onChange={(e) => updateScadaData(towerIndex, i, 'rotor_speed', +e.target.value)}
                  />
                </td>
              ))}
              <td>
                <input
                  type="number"
                  className="data-input"
                  value={tempInputs[towerIndex]?.scada.rotor_speed || 0}
                  onChange={(e) =>
                    setTempScada(towerIndex, {
                      ...tempInputs[towerIndex].scada,
                      rotor_speed: +e.target.value,
                    })
                  }
                />
              </td>
            </tr>

            {/* Temp. Ambiente */}
            <tr>
              <td>Temp. Ambiente</td>
              {tower.scada_data.map((item, i) => (
                <td key={i}>
                  <input
                    type="number"
                    className="data-input"
                    value={item.ambient_temperature}
                    onChange={(e) => updateScadaData(towerIndex, i, 'ambient_temperature', +e.target.value)}
                  />
                </td>
              ))}
              <td>
                <input
                  type="number"
                  className="data-input"
                  value={tempInputs[towerIndex]?.scada.ambient_temperature || 0}
                  onChange={(e) =>
                    setTempScada(towerIndex, {
                      ...tempInputs[towerIndex].scada,
                      ambient_temperature: +e.target.value,
                    })
                  }
                />
              </td>
            </tr>

            {/* Temp. Gerador */}
            <tr>
              <td>Temp. Gerador</td>
              {tower.scada_data.map((item, i) => (
                <td key={i}>
                  <input
                    type="number"
                    className="data-input"
                    value={item.generator_temperature}
                    onChange={(e) => updateScadaData(towerIndex, i, 'generator_temperature', +e.target.value)}
                  />
                </td>
              ))}
              <td>
                <input
                  type="number"
                  className="data-input"
                  value={tempInputs[towerIndex]?.scada.generator_temperature || 0}
                  onChange={(e) =>
                    setTempScada(towerIndex, {
                      ...tempInputs[towerIndex].scada,
                      generator_temperature: +e.target.value,
                    })
                  }
                />
              </td>
            </tr>

            {/* Ações - Remover */}
            <tr>
              <td>Ações</td>
              {tower.scada_data.map((_, i) => (
                <td key={i}>
                  <button
                    type="button"
                    onClick={() => removeScadaData(towerIndex, i)}
                    style={{ backgroundColor: '#a00', color: 'white' }}
                  >
                    Remover
                  </button>
                </td>
              ))}
              <td>
                <button
                  type="button"
                  onClick={() => {
                    const temp = tempInputs[towerIndex].scada;
                    if (!temp.timestamp) {
                      alert('Timestamp é obrigatório para SCADA data');
                      return;
                    }
                    addScadaData(towerIndex, temp);
                    setTempScada(towerIndex, {
                      timestamp: '',
                      wind_speed: 0,
                      power_output: 0,
                      nacelle_direction: 0,
                      rotor_speed: 0,
                      ambient_temperature: 0,
                      generator_temperature: 0,
                    });
                  }}
                >
                  Adicionar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>

          <div className="logsSystem">          
          <h3>Logs do sistema</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Evento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tower.logs.map((log, i) => (
                <tr key={i}>
                  <td>
                    <input
                      type="datetime-local"
                      className="data-input"
                      value={log.timestamp}
                      onChange={(e) => updateLog(towerIndex, i, 'timestamp', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="data-input"
                      value={log.event}
                      onChange={(e) => updateLog(towerIndex, i, 'event', e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => removeLog(towerIndex, i)}
                      style={{ backgroundColor: '#a00', color: 'white' }}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type="datetime-local"
                    className="data-input"
                    value={tempInputs[towerIndex]?.log.timestamp || ''}
                    onChange={(e) =>
                      setTempLog(towerIndex, { ...tempInputs[towerIndex].log, timestamp: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="data-input"
                    value={tempInputs[towerIndex]?.log.event || ''}
                    onChange={(e) =>
                      setTempLog(towerIndex, { ...tempInputs[towerIndex].log, event: e.target.value })
                    }
                  />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      const temp = tempInputs[towerIndex].log;
                      if (!temp.timestamp || !temp.event) {
                        alert('Preencha timestamp e evento para logs');
                        return;
                      }
                      addLog(towerIndex, temp);
                      setTempLog(towerIndex, { timestamp: '', event: '' });
                    }}
                  >
                    Adicionar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>

          <div className="anotacoes">
  <h3>Anotações</h3>
  <table className="data-table">
    <thead>
      <tr>
        <th>Timestamp</th>
        <th>Nota</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {tower.annotations.map((annotation, i) => (
        <tr key={i}>
          <td>
            <input
              type="datetime-local"
              className="data-input"
              value={annotation.timestamp}
              onChange={(e) =>
                updateAnnotation(towerIndex, i, 'timestamp', e.target.value)
              }
            />
          </td>
          <td>
            <input
              type="text"
              className="data-input"
              value={annotation.note}
              onChange={(e) =>
                updateAnnotation(towerIndex, i, 'note', e.target.value)
              }
            />
          </td>
          <td>
                                <button
                      type="button"
                      onClick={() => removeAnnotation(towerIndex, i)}
                      style={{ backgroundColor: '#a00', color: 'white' }}
                    >
                      Remover
                    </button>
          </td>
        </tr>
      ))}
      <tr>
        <td>
          <input
            type="datetime-local"
            className="data-input"
            value={tempInputs[towerIndex]?.annotation.timestamp || ''}
            onChange={(e) =>
              setTempAnnotation(towerIndex, {
                ...tempInputs[towerIndex].annotation,
                timestamp: e.target.value,
              })
            }
          />
        </td>
        <td>
          <input
            type="text"
            className="data-input"
            value={tempInputs[towerIndex]?.annotation.note || ''}
            onChange={(e) =>
              setTempAnnotation(towerIndex, {
                ...tempInputs[towerIndex].annotation,
                note: e.target.value,
              })
            }
          />
        </td>
        <td>
          <button
            type="button"
            className="add-button"
            onClick={() => {
              const temp = tempInputs[towerIndex].annotation;
              if (!temp.timestamp || !temp.note) {
                alert('Preencha timestamp e nota para anotações');
                return;
              }
              addAnnotation(towerIndex, temp);
              setTempAnnotation(towerIndex, { timestamp: '', note: '' });
            }}
          >
            Adicionar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
          </div>

          <div key={tower.id} className="standard-power-curve">
  <h3>Curva de Potência Padrão</h3>

  {tower.standard_power_curve.map((point, index) => (
    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
      <input
        type="number"
        placeholder="Velocidade do Vento (m/s)"
        value={point.wind_speed}
        onChange={(e) =>
          updateStandardPowerCurve(
            towerIndex,
            index,
            'wind_speed',
            parseFloat(e.target.value) || 0
          )
        }
      />
      <input
        type="number"
        placeholder="Potência Esperada (kW)"
        value={point.expected_power_output}
        onChange={(e) =>
          updateStandardPowerCurve(
            towerIndex,
            index,
            'expected_power_output',
            parseFloat(e.target.value) || 0
          )
        }
      />
      <button
        type="button"
        onClick={() => removeStandardPowerPoint(towerIndex, index)}
        style={{ backgroundColor: '#a00', color: 'white' }}
      >
        Remover
      </button>
    </div>
  ))}

  <button type="button" onClick={() => addStandardPowerPoint(towerIndex)}>
    Adicionar Ponto
  </button>
</div>


            <div className="structural-vibration-signals">
    <h3>Sinais de Vibração Estrutural</h3>
    <label>
      Timestamp:
      <input
        type="text"
        value={tower.structural_vibration_signals.timestamp}
        onChange={(e) =>
          updateStructuralVibrationSignals(towerIndex, 'timestamp', e.target.value)
        }
      />
    </label>
    <label>
      Torre (base) - sinais (ex: 0.02, 0.03):
      <input
        type="text"
        value={tower.structural_vibration_signals.tower_base.join(', ')}
        onChange={(e) =>
          updateStructuralVibrationSignals(towerIndex, 'tower_base', e.target.value)
        }
      />
    </label>
    <label>
      Drivetrain - sinais (ex: 0.05, 0.06):
      <input
        type="text"
        value={tower.structural_vibration_signals.drivetrain.join(', ')}
        onChange={(e) =>
          updateStructuralVibrationSignals(towerIndex, 'drivetrain', e.target.value)
        }
      />
    </label>
  </div>


          <div className="vibration-frequency-spectrum">
            <h3>Espectro de Frequência de Vibração</h3>

            <label>
              Timestamp:
              <input
                type="datetime-local"
                value={towers[towerIndex].vibration_frequency_spectrum.timestamp}
                onChange={(e) =>
                  updateVibrationFrequencySpectrum(towerIndex, 'timestamp', e.target.value)
                }
              />
            </label>

            <label>
              Frequencies (comma separated):
              <input
                type="text"
                placeholder="Ex: 1, 2, 3, 4"
                value={towers[towerIndex].vibration_frequency_spectrum.frequencies.join(', ')}
                onChange={(e) =>
                  updateVibrationFrequencySpectrum(towerIndex, 'frequencies', e.target.value)
                }
              />
            </label>

            <label>
              Amplitudes (comma separated):
              <input
                type="text"
                placeholder="Ex: 0.01, 0.02, 0.05, 0.01"
                value={towers[towerIndex].vibration_frequency_spectrum.amplitudes.join(', ')}
                onChange={(e) =>
                  updateVibrationFrequencySpectrum(towerIndex, 'amplitudes', e.target.value)
                }
              />
            </label>
          </div>

          <div className="bearing-vibration">
  <h3>Vibração do Rolamento</h3>

  <label>
    Timestamp:
    <input
      type="datetime-local"
      value={towers[towerIndex].bearing_vibration.timestamp}
      onChange={(e) =>
        updateBearingVibration(towerIndex, 'timestamp', e.target.value)
      }
    />
  </label>

  <label>
    Amplitude:
    <input
      type="number"
      step="0.01"
      value={towers[towerIndex].bearing_vibration.amplitude}
      onChange={(e) =>
        updateBearingVibration(towerIndex, 'amplitude', parseFloat(e.target.value))
      }
    />
  </label>
          </div>

          <div className="tower-stress-measurements">
            <h3>Medições de Estresse da Torre</h3>

            <label>
              Timestamp:
              <input
                type="datetime-local"
                value={towers[towerIndex].tower_stress_measurements.timestamp}
                onChange={(e) =>
                  updateTowerStressMeasurements(towerIndex, 'timestamp', e.target.value)
                }
              />
            </label>

            <label>
              Strain:
              <input
                type="number"
                step="0.0001"
                value={towers[towerIndex].tower_stress_measurements.strain}
                onChange={(e) =>
                  updateTowerStressMeasurements(towerIndex, 'strain', parseFloat(e.target.value))
                }
              />
            </label>

            <label>
              Stress:
              <input
                type="number"
                step="1"
                value={towers[towerIndex].tower_stress_measurements.stress}
                onChange={(e) =>
                  updateTowerStressMeasurements(towerIndex, 'stress', parseFloat(e.target.value))
                }
              />
            </label>
          </div>

          <div className="sensor-sampling-interval">
            <h3>Intervalo de Amostragem dos Sensores</h3>

            <label>
              SCADA:
              <input
                type="text"
                value={towers[towerIndex].sensor_sampling_interval.scada}
                onChange={(e) =>
                  updateSensorSamplingInterval(towerIndex, 'scada', e.target.value)
                }
              />
            </label>

            <label>
              Vibração:
              <input
                type="text"
                value={towers[towerIndex].sensor_sampling_interval.vibration}
                onChange={(e) =>
                  updateSensorSamplingInterval(towerIndex, 'vibration', e.target.value)
                }
              />
            </label>
          </div>

          <div className="accelerometer-data-location">
  <h3>Localização dos Acelerômetros</h3>
  <label>
    Base da Torre:
    <input
      type="text"
      value={tower.accelerometer_data_location.tower_base}
      onChange={(e) =>
        updateAccelerometerDataLocation(towerIndex, 'tower_base', e.target.value)
      }
    />
  </label>
  <label>
    Drivetrain:
    <input
      type="text"
      value={tower.accelerometer_data_location.drivetrain}
      onChange={(e) =>
        updateAccelerometerDataLocation(towerIndex, 'drivetrain', e.target.value)
      }
    />
  </label>
</div>


        </fieldset>
      ))}

      <button type="button" onClick={addTower}>
        Adicionar Torre
      </button>

      <div className="button-group">
        <button type="button" onClick={handleSubmit}>
          Criar Inspeção
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
      </div>
   )}
    </CreateInspectionFormContainer>
  );
};
