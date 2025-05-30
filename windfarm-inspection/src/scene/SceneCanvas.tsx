// src/components/SceneCanvas.tsx
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls, Sky} from '@react-three/drei'
import * as THREE from 'three'
import Grass from '../components/environment/grass/grass'
import { loadWindTurbines } from '../components/wind-turbine/useWindTurbines'

const PLANE_SIZE = 250
const MIN_CAMERA_HEIGHT = 1.5
const CAMERA_SPEED = 0.2

function GroundPlane() {
  const texture = useThree(({ gl }) => {
    const loader = new THREE.TextureLoader()
    const tex = loader.load('src/assets/grassTexture.png') // prefira public folder em React
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(PLANE_SIZE / 10, PLANE_SIZE / 10)
    return tex
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[PLANE_SIZE, PLANE_SIZE]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  )
}

function WindTurbines({ turbines }: { turbines: THREE.Object3D[] }) {
  return (
    <>
      {turbines.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </>
  )
}


function CameraController() {
  const { camera, gl } = useThree()
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })
  const prevPos = useRef(camera.position.clone())
  const planePos = useRef(new THREE.Vector3(0, 0, 0))

  // Handle key events
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
          moveState.current.forward = true
          break
        case 'a':
          moveState.current.left = true
          break
        case 's':
          moveState.current.backward = true
          break
        case 'd':
          moveState.current.right = true
          break
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
          moveState.current.forward = false
          break
        case 'a':
          moveState.current.left = false
          break
        case 's':
          moveState.current.backward = false
          break
        case 'd':
          moveState.current.right = false
          break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame(() => {
    const direction = new THREE.Vector3()
    const sideDirection = new THREE.Vector3()

    camera.getWorldDirection(direction)
    direction.y = 0
    direction.normalize()

    sideDirection.crossVectors(camera.up, direction).normalize()

    if (moveState.current.forward) camera.position.addScaledVector(direction, CAMERA_SPEED)
    if (moveState.current.backward) camera.position.addScaledVector(direction, -CAMERA_SPEED)
    if (moveState.current.left) camera.position.addScaledVector(sideDirection, CAMERA_SPEED)
    if (moveState.current.right) camera.position.addScaledVector(sideDirection, -CAMERA_SPEED)

    if (camera.position.y < MIN_CAMERA_HEIGHT) camera.position.y = MIN_CAMERA_HEIGHT

    const halfPlane = PLANE_SIZE / 2
    camera.position.x = Math.min(Math.max(camera.position.x, -halfPlane), halfPlane)
    camera.position.z = Math.min(Math.max(camera.position.z, -halfPlane), halfPlane)
    
    // Atualizar a posição do chão para dar ilusão de infinito
    const cameraMovement = new THREE.Vector3().subVectors(camera.position, prevPos.current)

    planePos.current.x -= cameraMovement.x
    planePos.current.z -= cameraMovement.z

    if (planePos.current.x > halfPlane) planePos.current.x -= PLANE_SIZE
    else if (planePos.current.x < -halfPlane) planePos.current.x += PLANE_SIZE
    if (planePos.current.z > halfPlane) planePos.current.z -= PLANE_SIZE
    else if (planePos.current.z < -halfPlane) planePos.current.z += PLANE_SIZE

    prevPos.current.copy(camera.position)
  })

  return null
}

type SceneCanvasProps = {
  turbines?: THREE.Object3D[]
}

export default function SceneCanvas({ turbines }: SceneCanvasProps) {
  const [internalTurbines, setInternalTurbines] = useState<THREE.Object3D[]>([])

  // Se a prop turbines não for passada, carrega os turbines internamente
  useEffect(() => {
    if (!turbines) {
      loadWindTurbines().then(setInternalTurbines)
    }
  }, [turbines])

  const turbinesToRender = turbines ?? internalTurbines

  return (
    <Canvas
      shadows
      camera={{ position: [0, 10, 20], fov: 75, near: 0.1, far: 1000 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <Sky
        distance={450000}
        sunPosition={[100, 50, 100]}
        inclination={0.49}
        azimuth={0.25}
      />
      <ambientLight intensity={0.4} />
      <hemisphereLight skyColor={0xddddff} groundColor={0x88bb88} intensity={0.2} />
      <directionalLight position={[10, 20, 10]} intensity={0.3} />
      <GroundPlane />
      <Grass
        instanceCount={100000 * 2}
        width={PLANE_SIZE}
        height={0.6}
        windSpeed={1.3}
        color="#7fc56b"
        position={[0, 0.02, 0]}
      />
      <WindTurbines turbines={turbinesToRender} />
      <OrbitControls enablePan={false} />
      <CameraController />
    </Canvas>
  )
}
