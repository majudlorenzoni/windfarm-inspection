import React, { useState, useEffect, useRef } from 'react'
import { useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type Props = {
  object: THREE.Object3D
  isHovered: boolean
  onHover: (obj: THREE.Object3D | null) => void
  onClick: (obj: THREE.Object3D) => void
}

export default function InteractiveTurbine({ object, isHovered, onHover, onClick }: Props) {
  const cloneRef = useRef<THREE.Object3D>(object.clone(true))

  useCursor(isHovered)

  // Aplica material diferente no hover
  useEffect(() => {
    const clone = cloneRef.current
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = mesh.material.clone()
      }
    })
  }, [])

  useFrame(() => {
    const hasAlert = cloneRef.current.userData?.hasAlert;
    console.log(hasAlert)

    cloneRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;

        console.log(hasAlert)
        if (hasAlert && isHovered) {
          mat.emissive.set('#ff0000'); // vermelho mais forte quando alertado + hover
        } else if (hasAlert) {
          mat.emissive.set('#7a0606'); // vermelho padrão de alerta
        } else if (isHovered) {
          mat.emissive.set('#3d9ff0'); // azul para hover sem alerta
        } else {
          mat.emissive.set('#000000'); // cor padrão sem hover nem alerta
        }
      }
    });
  });

  return (
    <primitive
      object={cloneRef.current}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(object)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        onHover(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick(object)
      }}
    />
  )
}
