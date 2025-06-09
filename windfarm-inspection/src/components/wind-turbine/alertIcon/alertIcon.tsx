import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

type AlertIconProps = {
  position: [number, number, number];
  alertType: string;
};

const alertIconsMap: Record<string, string> = {
  temperature: '../img/highTemperature.png',
  bearing_vibration: '../img/vibracao.png',
  stress: '../img/estresse.png',
  log: '../img/logs.png',
};

export function AlertIcon({ position, alertType }: AlertIconProps) {
  const textureUrl = alertIconsMap[alertType];
  const texture = useLoader(TextureLoader, textureUrl);

  return (
    <sprite position={position} scale={[1.5, 1.5, 1.5]}>
      <spriteMaterial attach="material" map={texture} />
    </sprite>
  );
}

