declare module 'troika-three-text' {
  import * as THREE from 'three';

  export class Text extends THREE.Object3D {
    text: string;
    fontSize: number;
    color: string;
    outlineWidth?: number;
    outlineColor?: string;
    anchorX?: 'left' | 'center' | 'right';
    anchorY?: 'top' | 'middle' | 'bottom';
    sync: () => void;
  }
}
