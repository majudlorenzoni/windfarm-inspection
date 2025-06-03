import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { LoadPageContainer } from './styles';
import { DataWind } from '../dataWind';
import { DataWindContainer } from '../dataWind/styles';
import { useWindData } from '../../windDataContext'

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
  num_variables: number;
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

type Tower = {
  id: string;
  scada_data: ScadaData[];
  metadata: Metadata;
  // demais campos omitidos para brevidade
};

type WindData = {
  towers: Tower[];
};

export const LoadPage = () => {
  const { windData, setWindData } = useWindData();
  const [localWindData, setLocalWindData] = useState<WindData | null>(null); // <-- agora local
  const [selectedTowerIndex, setSelectedTowerIndex] = useState<number>(0);
  const [confirmView, setConfirmView] = useState(false);
  const navigate = useNavigate()

  const validateJson = (json: any): json is WindData => {
    if (!json.towers || !Array.isArray(json.towers) || json.towers.length === 0) {
      alert('O JSON deve conter um array "towers" com ao menos uma torre.');
      return false;
    }

    for (const tower of json.towers) {
      if (!tower.scada_data || !tower.metadata) {
        alert(`A torre ${tower.id ?? 'sem id'} está faltando "scada_data" ou "metadata".`);
        return false;
      }
    }

    return true;
  };

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target?.result as string);

      if (!validateJson(json)) return;

      setLocalWindData(json);
      setWindData(json);           // <-- mover para dentro do onload, usar o 'json' correto
      setSelectedTowerIndex(0);
      setConfirmView(false);
    } catch (error) {
      console.error('Erro ao processar o arquivo JSON:', error);
      alert('Arquivo JSON inválido. Por favor, carregue um arquivo no formato correto.');
    }
  };
  reader.readAsText(file);
};


  const handleConfirm = () => {
    if (localWindData) {
      navigate('/windFarm');
    }
  };

  const handleSelectTower = (index: number) => {
    setSelectedTowerIndex(index);
    setConfirmView(false);
  };

 if (localWindData) {
    const currentTower = localWindData.towers[selectedTowerIndex];

    return (
      <DataWindContainer>
        <div className="tower-selector">
          <h2>Selecione a Torre</h2>
          <select
            value={selectedTowerIndex}
            onChange={(e) => handleSelectTower(Number(e.target.value))}
          >
            {localWindData.towers.map((tower, i) => (
              <option key={tower.id} value={i}>
                {tower.id}
              </option>
            ))}
          </select>
        </div>

        <DataWind
          data={currentTower}
          onDataChange={(newData) => {
            const updatedTowers = [...localWindData.towers];
            updatedTowers[selectedTowerIndex] = newData;
            setWindData({ towers: updatedTowers });
          }}
        />

        {!confirmView && (
          <button onClick={handleConfirm} className="confirm-button">
            Confirmar Dados
          </button>
        )}
      </DataWindContainer>
    );
  }

  return (
    <LoadPageContainer>
      <input
        type="file"
        id="json-upload"
        accept=".json"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <label htmlFor="json-upload" className="upload-label">
        <img src="/img/upload.png" alt="Clique para carregar arquivo JSON" />
      </label>

      <h1 className="title">Carregar nova inspeção</h1>
    </LoadPageContainer>
  );
};