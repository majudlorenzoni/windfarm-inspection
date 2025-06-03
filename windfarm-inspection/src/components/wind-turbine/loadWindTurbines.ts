import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export async function loadWindTurbines(towersData: any[]): Promise<THREE.Object3D[]> {
  const loader = new GLTFLoader()
  
  // Carrega o modelo uma vez
  const gltf = await loader.loadAsync('/models/windTower.glb')

  const spacing = 50
  const yPos = 0
  const zPos = 0

  const turbines = towersData.map((tower, index) => {
    // Clona o modelo para instanciar múltiplas turbinas
    const turbine = gltf.scene.clone(true)
    
    turbine.position.set(index * spacing, yPos, zPos)
    turbine.name = tower.id
    
    // Se quiser, pode adicionar propriedades ou dados ao objeto
    // turbine.userData = { ...tower }

    return turbine
  })

  return turbines
}
