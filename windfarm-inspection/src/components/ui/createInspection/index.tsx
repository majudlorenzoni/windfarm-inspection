import { useState, useEffect } from 'react';
import { CreateInspectionFormContainer } from './styles';

// Tipagens (conforme seu modelo)
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

type Tower = {
  id: string;
  scada_data: ScadaData[];
  metadata: Metadata;
  logs: LogEntry[];
  annotations: Annotation[];
};

type WindData = {
  towers: Tower[];
};

let towerCounter = 1;

export const CreateInspectionForm = ({
  onCreate,
  onCancel,
}: {
  onCreate: (data: WindData) => void;
  onCancel: () => void;
}) => {
  // Estado principal: array de torres
  const [towers, setTowers] = useState<Tower[]>([]);

  // Função para adicionar torre nova vazia
  const addTower = () => {
    setTowers([
      ...towers,
      {
        id: `Torre ${towerCounter++}`,
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
      },
    ]);
  };

  // Remove torre
  const removeTower = (towerIndex: number) => {
    setTowers(towers.filter((_, i) => i !== towerIndex));
  };

  // Atualiza SCADA data de uma torre
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

  // Adiciona SCADA data nova na torre
  const addScadaData = (towerIndex: number, newScada: ScadaData) => {
    const newTowers = [...towers];
    newTowers[towerIndex].scada_data.push(newScada);
    setTowers(newTowers);
  };

  // Remove SCADA data da torre
  const removeScadaData = (towerIndex: number, dataIndex: number) => {
    const newTowers = [...towers];
    newTowers[towerIndex].scada_data.splice(dataIndex, 1);
    setTowers(newTowers);
  };

  // Atualiza log da torre
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

  // Adiciona log novo na torre
  const addLog = (towerIndex: number, newLog: LogEntry) => {
    const newTowers = [...towers];
    newTowers[towerIndex].logs.push(newLog);
    setTowers(newTowers);
  };

  // Remove log da torre
  const removeLog = (towerIndex: number, logIndex: number) => {
    const newTowers = [...towers];
    newTowers[towerIndex].logs.splice(logIndex, 1);
    setTowers(newTowers);
  };

  // Atualiza anotação da torre
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

  // Adiciona anotação nova na torre
  const addAnnotation = (towerIndex: number, newAnnotation: Annotation) => {
    const newTowers = [...towers];
    newTowers[towerIndex].annotations.push(newAnnotation);
    setTowers(newTowers);
  };

  // Remove anotação da torre
  const removeAnnotation = (towerIndex: number, annotationIndex: number) => {
    const newTowers = [...towers];
    newTowers[towerIndex].annotations.splice(annotationIndex, 1);
    setTowers(newTowers);
  };

  // Atualiza metadados da torre
  const updateMetadata = (towerIndex: number, field: keyof Metadata, value: any) => {
    const newTowers = [...towers];
    newTowers[towerIndex].metadata = {
      ...newTowers[towerIndex].metadata,
      [field]: value,
    };
    setTowers(newTowers);
  };

  // Estados temporários para inputs de SCADA, log e anotação para cada torre
  const [tempInputs, setTempInputs] = useState<
    {
      scada: ScadaData;
      log: LogEntry;
      annotation: Annotation;
    }[]
  >([]);

  // Inicializa o tempInputs quando towers mudam (sincroniza length)
  // Para cada torre, manter um estado temporário dos inputs para adicionar novos dados
  // Se a torre é adicionada/removida, ajusta tempInputs para não dar erro
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
          }
        );
      });
      setTempInputs(newTemps);
    }
  };

  // Sincroniza sempre que towers mudarem

useEffect(() => {
  syncTempInputs();
}, [towers]);

  // Funções para alterar temporários

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
  const handleSubmit = () => {
    if (towers.length === 0) {
      alert('Adicione ao menos uma torre!');
      return;
    }

    // Atualiza metadata (datas, num_datapoints, logs) automaticamente antes do envio
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

    onCreate({ towers: towersWithUpdatedMetadata });
  };

  return (
    <CreateInspectionFormContainer>
          <div className="form-wrapper">

      <h1>Criar nova inspeção</h1>

      <button type="button" onClick={addTower}>
        Adicionar Torre
      </button>

      {towers.length === 0 && <p>Nenhuma torre adicionada ainda.</p>}

      {towers.map((tower, towerIndex) => (
        <fieldset key={tower.id} className="data-section">
          <legend>{tower.id}</legend>

          <button
            type="button"
            onClick={() => removeTower(towerIndex)}
            style={{ backgroundColor: '#a00', color: 'white', marginBottom: '10px' }}
          >
            Remover Torre
          </button>

          {/* SCADA Data */}
            <div className="scada-table-wrapper">
          <h3>Dados SCADA</h3>

<table className="data-table-scala-vertical">
  <thead>
    <tr>
      <th>Campo</th>
      {tower.scada_data.map((_, i) => (
        <th key={i}>Entrada {i + 1}</th>
      ))}
      <th>Nova Entrada</th>
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

          {/* Logs */}
          <div className="logsSystem">          
          <h3>Logs do Sistema</h3>
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
                      onChange={(e) => updateAnnotation(towerIndex, i, 'timestamp', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="data-input"
                      value={annotation.note}
                      onChange={(e) => updateAnnotation(towerIndex, i, 'note', e.target.value)}
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

          <div className="metadados">            
          <h3>Metadados</h3>
          <div className="metadata-group">
            {Object.entries(tower.metadata).map(([key, value]) => (
              <label key={key} style={{ display: 'block', marginBottom: 6 }}>
                {key.replace(/_/g, ' ')}:{' '}
                <input
                  type={typeof value === 'number' ? 'number' : 'text'}
                  value={value}
                  onChange={(e) =>
                    updateMetadata(
                      towerIndex,
                      key as keyof Metadata,
                      typeof value === 'number' ? +e.target.value : e.target.value
                    )
                  }
                  style={{ width: '150px' }}
                />
              </label>
            ))}
          </div>
          </div>
        </fieldset>
      ))}

      <div className="button-group">
        <button type="button" onClick={handleSubmit}>
          Criar Inspeção
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
          </div>

    </CreateInspectionFormContainer>
  );
};
