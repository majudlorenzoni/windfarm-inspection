import React from 'react'
import { DataWindContainer } from './styles';

interface DataWindProps {
  data: any;
  onDataChange: (newData: any) => void;
}

export const DataWind: React.FC<DataWindProps> = ({ data, onDataChange }) => {
  const handleChange = (path: string, value: any) => {
    const newData = { ...data };
    const keys = path.split('.');
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    onDataChange(newData);
  };

  const handleArrayItemChange = (path: string, index: number, field: string, value: any) => {
    const newData = { ...data };
    const keys = path.split('.');
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]][index][field] = value;
    onDataChange(newData);
  };

  const renderSection = (title: string, content: React.ReactNode) => {
    return (
      <div className="data-section">
        <h3 className="section-title">{title}</h3>
        {content}
      </div>
    );
  };

  const renderTable = (headers: string[], rows: React.ReactNode[][]) => {
    return (
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <DataWindContainer className="data-wind-container">
      {/* Seção SCADA Data */}
      {renderSection('Dados SCADA', renderTable(
        ['Timestamp', 'Velocidade Vento (m/s)', 'Potência (kW)', 'Direção Nacele'],
        data.scada_data.map((item: any, index: number) => [
          <input
            type="datetime-local"
            className="data-input"
            value={item.timestamp}
            onChange={(e) => handleArrayItemChange('scada_data', index, 'timestamp', e.target.value)}
            key={`scada-${index}-0`}
          />,
          <input
            type="number"
            className="data-input"
            value={item.wind_speed}
            onChange={(e) => handleArrayItemChange('scada_data', index, 'wind_speed', parseFloat(e.target.value))}
            key={`scada-${index}-1`}
          />,
          <input
            type="number"
            className="data-input"
            value={item.power_output}
            onChange={(e) => handleArrayItemChange('scada_data', index, 'power_output', parseInt(e.target.value))}
            key={`scada-${index}-2`}
          />,
          <input
            type="number"
            className="data-input"
            value={item.nacelle_direction}
            onChange={(e) => handleArrayItemChange('scada_data', index, 'nacelle_direction', parseInt(e.target.value))}
            key={`scada-${index}-3`}
          />
        ])
      ))}

      {/* Seção Metadados */}
      {renderSection('Metadados', renderTable(
        ['Parâmetro', 'Valor'],
        [
          ['Total de Pontos', data.metadata.num_datapoints],
          ['Energia Total (MWh)', 
            <input
              type="number"
              className="data-input"
              value={data.metadata.energy_total_mwh}
              onChange={(e) => handleChange('metadata.energy_total_mwh', parseFloat(e.target.value))}
              key="energy-input"
            />
          ],
          ['Fator de Capacidade', data.metadata.capacity_factor],
          ['Horas Equivalentes', data.metadata.flh]
        ]
      ))}

      {/* Seção Logs */}
      {renderSection('Logs do Sistema', renderTable(
        ['Timestamp', 'Evento'],
        data.logs.map((log: any, index: number) => [
          log.timestamp,
          <input
            type="text"
            className="data-input"
            value={log.event}
            onChange={(e) => handleArrayItemChange('logs', index, 'event', e.target.value)}
            key={`log-${index}`}
          />
        ])
      ))}

      {/* Seção Manutenção */}
      {renderSection('Registros de Manutenção', renderTable(
        ['Data', 'Descrição', 'Técnico'],
        data.maintenance_log.map((item: any, index: number) => [
          <input
            type="date"
            className="data-input"
            value={item.date}
            onChange={(e) => handleArrayItemChange('maintenance_log', index, 'date', e.target.value)}
            key={`maintenance-${index}-0`}
          />,
          <textarea
            className="data-textarea"
            value={item.description}
            onChange={(e) => handleArrayItemChange('maintenance_log', index, 'description', e.target.value)}
            key={`maintenance-${index}-1`}
          />,
          <input
            type="text"
            className="data-input"
            value={item.technician}
            onChange={(e) => handleArrayItemChange('maintenance_log', index, 'technician', e.target.value)}
            key={`maintenance-${index}-2`}
          />
        ])
      ))}

      {/* Seção Dados Técnicos */}
      {renderSection('Dados Técnicos', renderTable(
        ['Parâmetro', 'Valor'],
        [
          ['Vibração do Rolamento', 
            <input
              type="number"
              step="0.001"
              className="data-input"
              value={data.bearing_vibration.amplitude}
              onChange={(e) => handleChange('bearing_vibration.amplitude', parseFloat(e.target.value))}
              key="vibration-input"
            />
          ],
          ['Tensão na Torre (MPa)', 
            <input
              type="number"
              className="data-input"
              value={data.tower_stress_measurements.stress}
              onChange={(e) => handleChange('tower_stress_measurements.stress', parseInt(e.target.value))}
              key="stress-input"
            />
          ]
        ]
      ))}
    </DataWindContainer>
  );
};
