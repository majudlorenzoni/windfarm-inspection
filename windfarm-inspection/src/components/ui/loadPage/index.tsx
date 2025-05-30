import { useState } from 'react';
import { LoadPageContainer } from './styles';
import { loadWindTurbines } from '../../wind-turbine/useWindTurbines';
import { Object3D } from 'three';
import SceneCanvas from '../../../scene/SceneCanvas';


export const LoadPage = () => {
  const [turbines, setTurbines] = useState<Object3D[] | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const json = JSON.parse(e.target?.result as string)

        if (!Array.isArray(json) || !json.every(t => t.id && Array.isArray(t.position))) {
          throw new Error('JSON inválido: deve conter uma lista de turbinas com id e position.')
        }

        const loadedTurbines = await loadWindTurbines(json)
        setTurbines(loadedTurbines)
        console.log('Turbinas carregadas:', loadedTurbines)
      } catch (error) {
        console.error('Erro ao processar o arquivo JSON:', error)
        alert('Arquivo JSON inválido.')
      }
    }
    reader.readAsText(file)
  }

  if (turbines) {
    return <SceneCanvas turbines={turbines} />
  }

  return (
    <LoadPageContainer>
      {/* input escondido */}
      <input
        type="file"
        id="json-upload"
        accept=".json"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      
      {/* label clicável com a imagem */}
      <label htmlFor="json-upload" style={{ cursor: 'pointer' }}>
        <img src="/img/upload.png" alt="Clique para carregar arquivo JSON" />
      </label>

      <h1 className="title">Carregar nova inspeção</h1>
    </LoadPageContainer>
  );
};
