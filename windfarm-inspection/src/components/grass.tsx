// Grass.tsx
import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

const vertexShader = `
  varying vec2 vUv;
  uniform float time;

  void main() {
    vUv = uv;

    vec4 mvPosition = vec4(position, 1.0);
    #ifdef USE_INSTANCING
      mvPosition = instanceMatrix * mvPosition;
    #endif

    float dispPower = 1.0 - cos(uv.y * 3.1416 / 2.0);
    float displacement = sin(mvPosition.z + time * 10.0) * (0.1 * dispPower);
    mvPosition.z += displacement;

    vec4 modelViewPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * modelViewPosition;
  }
`

const fragmentShader = `
  varying vec2 vUv;

  void main() {
    vec3 baseColor = vec3(0.41, 1.0, 0.5);
    float clarity = (vUv.y * 0.5) + 0.5;
    gl_FragColor = vec4(baseColor * clarity, 1.0);
  }
`

export function Grass() {
  const instanceNumber = 5000
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const clock = useRef(new THREE.Clock())

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
    }),
    [],
  )

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
    })
  }, [uniforms])

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.1, 1, 1, 4)
    geo.translate(0, 0.5, 0)
    return geo
  }, [])

  useMemo(() => {
    const dummy = new THREE.Object3D()
    for (let i = 0; i < instanceNumber; i++) {
      dummy.position.set((Math.random() - 0.5) * 10, 0, (Math.random() - 0.5) * 10)
      dummy.scale.setScalar(0.5 + Math.random() * 0.5)
      dummy.rotation.y = Math.random() * Math.PI
      dummy.updateMatrix()
      meshRef.current?.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current?.instanceMatrix.needsUpdate = true
  }, [instanceNumber])

  useFrame(() => {
    uniforms.time.value = clock.current.getElapsedTime()
  })

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, instanceNumber]} />
  )
}
