import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { checkIfTowerHasAllAlerts }  from '../components/wind-turbine/checkTowerAlert'

type SmokeEffectProps = {
  turbines: THREE.Object3D[]
  towerData: any[]
}

const SmokeEffect: React.FC<SmokeEffectProps> = ({ turbines, towerData }) => {
  const smokeParticles = useRef<THREE.Mesh[]>([])
  const { scene } = useThree()

  const smokeGeo = new THREE.PlaneGeometry(6, 6)
  const smokeTexture = new THREE.TextureLoader().load('/img/smoke.png')

  const baseMaterial = new THREE.MeshLambertMaterial({
    map: smokeTexture,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.NormalBlending,
  })

  // Gerar partículas
  useEffect(() => {
    smokeParticles.current.forEach(p => scene.remove(p))
    smokeParticles.current = []

    turbines.forEach(turbine => {
      const tower = towerData.find(t => t.id === turbine.name)
      if (!tower || !checkIfTowerHasAllAlerts(tower)) return

      // Mais partículas = mais volume
      for (let i = 0; i < 80; i++) {
        const material = baseMaterial.clone()
        const particle = new THREE.Mesh(smokeGeo, material)

        const spread = 2 // compactar na base
        const xOffset = (Math.random() - 0.5) * spread
        const zOffset = (Math.random() - 0.5) * spread
        const yStart = turbine.position.y + 13  // ↓ abaixado de 15 para 10

        particle.position.set(
          turbine.position.x + xOffset,
          yStart,
          turbine.position.z + zOffset
        )

        particle.userData = {
          startY: yStart,
          towerId: tower.id,
          baseX: turbine.position.x + xOffset,
          baseZ: turbine.position.z + zOffset,
          speed: 1.5 + Math.random() * 2,
          noiseOffset: Math.random() * 100
        }

        particle.rotation.z = Math.random() * Math.PI * 2
        scene.add(particle)
        smokeParticles.current.push(particle)
      }
    })

    return () => {
      smokeParticles.current.forEach(p => scene.remove(p))
      smokeParticles.current = []
    }
  }, [turbines, towerData, scene])

  // Loop de animação
  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime()

    smokeParticles.current.forEach(p => {
      const { startY, speed, towerId, baseX, baseZ, noiseOffset } = p.userData

      // Sobe no eixo Y
      p.position.y += delta * speed

      // Movimento zigue-zague no X e Z com base no tempo
      p.position.x = baseX + Math.sin(elapsed * 1.5 + noiseOffset) * 1.5  // ↑ mais rápido e mais largo
      p.position.z = baseZ + Math.cos(elapsed * 1.2 + noiseOffset) * 1.5  // ↑ mais rápido e mais largo

      // Rotação
      p.rotation.z += delta * 0.2

      // Loop da partícula
      if (p.position.y > startY + 7) {
        p.position.y = startY
      }

      const tower = towerData.find(t => t.id === towerId)
      if (tower) {
        const mat = p.material as THREE.MeshLambertMaterial
        mat.opacity = checkIfTowerHasAllAlerts(tower) ? 0.75 : 0.4
      }
    })
  })
  return null
}

export default SmokeEffect
