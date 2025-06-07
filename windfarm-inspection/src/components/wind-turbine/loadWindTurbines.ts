import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { checkIfTowerHasAlert } from './checkTowerAlert'

export async function loadWindTurbines(towersData: any[]): Promise<THREE.Object3D[]> {
  const loader = new GLTFLoader()
  const gltf = await loader.loadAsync('/models/windTower.glb')

  const spacing = 35
  const yPos = 0

  const maxPerRow = 8
  // max de linhas = 8, pode expandir se precisar, mas segue essa lógica

  const turbines = towersData.map((tower, index) => {
    const turbine = gltf.scene.clone(true)

    // Calcular posição X e Z baseado no índice da torre
    const xIndex = index % maxPerRow
    const zIndex = Math.floor(index / maxPerRow)

    // Centralizar a grade em X e Z (para ficar no centro da cena)
    // Por exemplo, se tiver 8 torres na linha, queremos posicionar entre -122.5 a +122.5
    const totalCols = Math.min(towersData.length, maxPerRow)
    const totalRows = Math.ceil(towersData.length / maxPerRow)

    const xOffset = ((totalCols - 1) * spacing) / 2
    const zOffset = ((totalRows - 1) * spacing) / 2

    const xPos = xIndex * spacing - xOffset
    const zPos = zIndex * spacing - zOffset

    turbine.position.set(xPos, yPos, zPos)
    turbine.name = tower.id

    const hasAlert = checkIfTowerHasAlert(tower);

    turbine.userData = {
      ...tower,
      hasAlert
    };

    return turbine
  })

  return turbines
}
