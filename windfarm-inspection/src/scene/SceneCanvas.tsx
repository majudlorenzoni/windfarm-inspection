// src/components/SceneCanvas.tsx
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Grass from '../components/environment/grass/grass'
import { loadWindTurbines } from '../components/wind-turbine/useWindTurbines'

const PLANE_SIZE = 150
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

function WindTurbines() {
  const [turbines, setTurbines] = useState<THREE.Object3D[]>([])

  useEffect(() => {
    loadWindTurbines().then((objs) => {
      setTurbines(objs)
    })
  }, [])

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

    // Atualizar a posição do chão para dar ilusão de infinito
    const cameraMovement = new THREE.Vector3().subVectors(camera.position, prevPos.current)

    planePos.current.x -= cameraMovement.x
    planePos.current.z -= cameraMovement.z

    const halfPlane = PLANE_SIZE / 2
    if (planePos.current.x > halfPlane) planePos.current.x -= PLANE_SIZE
    else if (planePos.current.x < -halfPlane) planePos.current.x += PLANE_SIZE
    if (planePos.current.z > halfPlane) planePos.current.z -= PLANE_SIZE
    else if (planePos.current.z < -halfPlane) planePos.current.z += PLANE_SIZE

    prevPos.current.copy(camera.position)
  })

  return null
}

export default function SceneCanvas() {
  const planeRef = useRef<THREE.Mesh>(null)

  return (
    <Canvas
      shadows
      camera={{ position: [0, 10, 20], fov: 75, near: 0.1, far: 1000 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={0.4} />
      <hemisphereLight skyColor={0xddddff} groundColor={0x88bb88} intensity={0.2} />
      <directionalLight position={[10, 20, 10]} intensity={0.3} />
      <GroundPlane />
      <Grass
        instanceCount={75000}      // mais gramas no espaço
        width={PLANE_SIZE}
        height={1.2}
        windSpeed={1.3}
        color="#7fc56b"           // cor mais clara, verde vibrante
        position={[0, 0.02, 0]}   // leve aumento na altura pra garantir que fique acima do plano
      />
      <WindTurbines />
      <OrbitControls enablePan={false} />
      <CameraController />
    </Canvas>
  )
}
