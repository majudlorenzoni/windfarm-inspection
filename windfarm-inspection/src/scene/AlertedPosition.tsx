import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'

type AlertedPositionProps = {
  tower: any;
  children: React.ReactNode;
};

export const AlertedPosition: React.FC<AlertedPositionProps> = ({ tower, children }) => {
  const groupRef = useRef<THREE.Group>(null);

  const vibAmplitude = tower?.bearing_vibration?.amplitude ?? 0;
  const hasVibAlert = vibAmplitude > 0.1;

  const maxOscillation = 0.05;
  const oscillationAmplitude = Math.min(vibAmplitude * 0.03, maxOscillation);

  useEffect(() => {
    console.log("🚧 AlertedPosition MONTADO");
    console.log("Amplitude:", vibAmplitude, "Alerta?", hasVibAlert);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      console.log("⚠️ groupRef.current está null");
      return;
    }

    if (hasVibAlert) {
      const t = clock.getElapsedTime();
      const offsetX = Math.sin(t * 15) * oscillationAmplitude;
      const offsetY = Math.cos(t * 20) * oscillationAmplitude;

      groupRef.current.position.set(offsetX, offsetY, 0);
      console.log("🔁 Vibrando", offsetX.toFixed(3), offsetY.toFixed(3));
    } else {
      groupRef.current.position.set(0, 0, 0);
    }
  });

  return <group ref={groupRef}>{children}</group>;
};
