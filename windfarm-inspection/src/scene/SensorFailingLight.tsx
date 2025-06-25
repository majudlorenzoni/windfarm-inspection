import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isSensorFailing } from '../components/wind-turbine/checkTowerAlert'

type SensorFailingLightProps = {
  tower: any;
  position: THREE.Vector3; // posição onde a luz vai aparecer (ex: topo da torre)
};

const blinkSpeed = 4; // pisca 4 vezes por segundo

const SensorFailingLight: React.FC<SensorFailingLightProps> = ({ tower, position }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  const failing = isSensorFailing(tower);

  useFrame(({ clock }) => {
    if (!failing) {
      if (lightRef.current) lightRef.current.intensity = 0;
      if (sphereRef.current) sphereRef.current.material.opacity = 0;
      return;
    }

    const time = clock.getElapsedTime();
    const intensity = (Math.sin(time * Math.PI * blinkSpeed) + 1) / 2; // 0 a 1

    if (lightRef.current) lightRef.current.intensity = intensity * 2; // intensidade máxima 2
    if (sphereRef.current) {
      // Material com transparência
      (sphereRef.current.material as THREE.MeshStandardMaterial).opacity = intensity;
    }
  });

  return (
    <group position={position}>
      {/* Luz emissiva pulsante */}
      <pointLight
        ref={lightRef}
        color="red"
        intensity={0}
        distance={10}
        decay={2}
        castShadow={false}
      />
      {/* Esfera vermelha que pisca */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="red"
          emissive="red"
          emissiveIntensity={1}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default SensorFailingLight;
