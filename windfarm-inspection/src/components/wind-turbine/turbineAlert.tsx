import * as THREE from 'three'
import { Text } from 'troika-three-text'
import React, { useEffect, useRef } from 'react'

type TurbineAlertProps = {
  turbine: THREE.Object3D & { userData: { hasAlert?: boolean } }
}

export default function TurbineAlert({ turbine }: TurbineAlertProps) {
  const groupRef = useRef<THREE.Group>(null)
  const textRef = useRef<Text | null>(null)

  useEffect(() => {
    if (textRef.current) {
      textRef.current.sync()
    }
  }, [])

  useEffect(() => {
    if (!groupRef.current) return

    // Cria o objeto texto se não existir
    if (!textRef.current) {
      const text = new Text()
      text.text = 'Gerador com problema'
      text.fontSize = 3
      text.color = 'red'
      text.anchorX = 'center'
      text.anchorY = 'bottom'
      text.outlineWidth = 0.3
      text.outlineColor = 'black'
      text.position.set(0, 3, 0)
      text.sync()
      groupRef.current.add(text)
      textRef.current = text
    }
  }, [])

  if (!turbine.userData.hasAlert) return null

  return (
    <group ref={groupRef} position={[0, 20, 0]}>
      <mesh>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshStandardMaterial color="red" emissive="red" />
      </mesh>
    </group>
  )
}
