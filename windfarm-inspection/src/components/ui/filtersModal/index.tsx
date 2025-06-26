import React, { useEffect, useState } from 'react';
import { checkIfTowerHasAlert } from '../../wind-turbine/checkTowerAlert';
import { FilterModalContainer } from './styles';

type Tower = {
  id: string;
  tower_stress_measurements?: { stress: number };
  bearing_vibration?: { amplitude: number };
  logs?: { event: string }[];
  metadata?: { first_timestamp: string; last_timestamp: string };
  scada_data?: { generator_temperature?: number }[];
};

type TurbineFilterModalProps = {
  allTowers: Tower[];
  filteredIds: string[] | null;
  onChange: (newIds: string[] | null) => void;
  onClose: () => void;
};

export default function TurbineFilterModal({
  allTowers,
  filteredIds,
  onChange,
  onClose,
}: TurbineFilterModalProps) {
  const [showOnlyWithAlert, setShowOnlyWithAlert] = useState(false);
  const [stressRange, setStressRange] = useState<[number, number]>([0, 500]);
  const [vibrationRange, setVibrationRange] = useState<[number, number]>([0, 1]);
  const [hasFailureLog, setHasFailureLog] = useState(false);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });
  const [tempRange, setTempRange] = useState<[number, number]>([0, 150]);

  useEffect(() => {
    let filtered = allTowers;

    if (showOnlyWithAlert) filtered = filtered.filter(checkIfTowerHasAlert);

    filtered = filtered.filter((tower) => {
      const stress = tower.tower_stress_measurements?.stress ?? 0;
      if (stress < stressRange[0] || stress > stressRange[1]) return false;

      const vib = tower.bearing_vibration?.amplitude ?? 0;
      if (vib < vibrationRange[0] || vib > vibrationRange[1]) return false;

      if (hasFailureLog) {
        const hasLog =
          tower.logs?.some((log) =>
            ['failure', 'shutdown', 'misalignment'].some((keyword) =>
              log.event.toLowerCase().includes(keyword),
            ),
          ) ?? false;
        if (!hasLog) return false;
      }

      if (dateRange.start && dateRange.end && tower.metadata) {
        const first = new Date(tower.metadata.first_timestamp);
        const last = new Date(tower.metadata.last_timestamp);
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        if (last < start || first > end) return false;
      }

      if (tower.scada_data && tower.scada_data.length > 0) {
        const latest = tower.scada_data[tower.scada_data.length - 1];
        const genTemp = latest.generator_temperature ?? 0;
        if (genTemp < tempRange[0] || genTemp > tempRange[1]) return false;
      }

      return true;
    });

    onChange(filtered.map((t) => t.id));
  }, [
    showOnlyWithAlert,
    stressRange,
    vibrationRange,
    hasFailureLog,
    dateRange,
    tempRange,
    allTowers,
    onChange,
  ]);

  return (
    <FilterModalContainer>
      <div className="modal">
        <h3>Selecionar turbinas</h3>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showOnlyWithAlert}
            onChange={(e) => setShowOnlyWithAlert(e.target.checked)}
          />
          Mostrar apenas torres com defeito
        </label>

        <div>
          <label>
            Período inicial:
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
          </label>
          <label style={{ marginLeft: '1rem' }}>
            Período final:
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </label>
        </div>
        
        <label>
          Estresse da torre: {stressRange[0]} - {stressRange[1]}
          <input
            type="range"
            min={0}
            max={500}
            value={stressRange[0]}
            onChange={(e) =>
              setStressRange([Number(e.target.value), stressRange[1]])
            }
          />
          <input
            type="range"
            min={0}
            max={500}
            value={stressRange[1]}
            onChange={(e) =>
              setStressRange([stressRange[0], Number(e.target.value)])
            }
          />
        </label>

        <label>
          Vibração do rolamento: {vibrationRange[0].toFixed(2)} -{' '}
          {vibrationRange[1].toFixed(2)}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={vibrationRange[0]}
            onChange={(e) =>
              setVibrationRange([Number(e.target.value), vibrationRange[1]])
            }
          />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={vibrationRange[1]}
            onChange={(e) =>
              setVibrationRange([vibrationRange[0], Number(e.target.value)])
            }
          />
        </label>

        <label className="checkbox-label" style={{ marginTop: '1rem' }}>
          <input
            type="checkbox"
            checked={hasFailureLog}
            onChange={(e) => setHasFailureLog(e.target.checked)}
          />
          Mostrar apenas torres com falha registrada
        </label>

        <label style={{ marginTop: '1rem' }}>
          Temperatura do gerador: {tempRange[0]}°C - {tempRange[1]}°C
          <input
            type="range"
            min={0}
            max={150}
            value={tempRange[0]}
            onChange={(e) => setTempRange([Number(e.target.value), tempRange[1]])}
          />
          <input
            type="range"
            min={0}
            max={150}
            value={tempRange[1]}
            onChange={(e) => setTempRange([tempRange[0], Number(e.target.value)])}
          />
        </label>

        <div className="actions">
          <button className="primary" onClick={onClose}>
            Aplicar
          </button>
          <button
            className="secondary"
            onClick={() => {
              onChange(null);
              onClose();
            }}
          >
            Resetar
          </button>
        </div>
      </div>
    </FilterModalContainer>
  );
}