// src/components/SceneCanvas.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { loadWindTurbines } from './useWindTurbines.ts';

export default function SceneCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  });
  const cameraSpeed = useRef(0.2);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const prevCameraPosition = useRef(new THREE.Vector3());
  const minCameraHeight = 1.5; // Altura mínima da câmera em relação ao chão

  useEffect(() => {
    // Cena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#dfefff');

    loadWindTurbines().then((turbines) => {
    turbines.forEach((turbine) => scene.add(turbine));
    });

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 20);
    prevCameraPosition.current.copy(camera.position);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current!.appendChild(renderer.domElement);

    // Luz direcional
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    // Chão infinito (usando um grid grande que se move com a câmera)
    const planeSize = 100; // Tamanho de cada segmento do chão
    const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const textureLoader = new THREE.TextureLoader();
    const grassTexture = textureLoader.load('src/assets/grassTexture.png');
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(planeSize / 10, planeSize / 10);

    const planeMaterial = new THREE.MeshStandardMaterial({ 
      map: grassTexture,
      side: THREE.DoubleSide
    });
;
    
    // Criar múltiplos planos para dar a ilusão de infinito
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    planeRef.current = plane;
    scene.add(plane);

    // Adicionar um grid helper para melhor visualização
    const gridHelper = new THREE.GridHelper(planeSize, 20, 0x555555, 0x333333);
    gridHelper.position.y = 0.01; // Coloca ligeiramente acima do plano para evitar z-fighting
    scene.add(gridHelper);

    // Loader do modelo GLB
//   const gltfLoader = new GLTFLoader();
//   gltfLoader.load(
//   '/models/windTower.glb', // coloque seu caminho aqui (deve estar em "public/models/")
//  (gltf) => {
//   const turbine = gltf.scene;
//   console.log('Turbina carregada:', turbine);
//   console.log('Turbina carregada:', gltf);
//   turbine.position.set(0, 0, 0);
//   turbine.scale.set(1, 1, 1);
//   scene.add(turbine);
// },
//   undefined,
//   (error) => {
//     console.error('Erro ao carregar modelo GLB:', error);
//   }
// );

    // Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;

    // Event listeners para teclado
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'w': moveState.current.forward = true; break;
        case 'a': moveState.current.left = true; break;
        case 's': moveState.current.backward = true; break;
        case 'd': moveState.current.right = true; break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'w': moveState.current.forward = false; break;
        case 'a': moveState.current.left = false; break;
        case 's': moveState.current.backward = false; break;
        case 'd': moveState.current.right = false; break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Função para atualizar tamanho na mudança da janela
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Loop de animação
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Movimento da câmera
      const direction = new THREE.Vector3();
      const sideDirection = new THREE.Vector3();
      
      camera.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();
      sideDirection.crossVectors(camera.up, direction).normalize();
      
      if (moveState.current.forward) camera.position.addScaledVector(direction, cameraSpeed.current);
      if (moveState.current.backward) camera.position.addScaledVector(direction, -cameraSpeed.current);
      if (moveState.current.left) camera.position.addScaledVector(sideDirection, cameraSpeed.current);
      if (moveState.current.right) camera.position.addScaledVector(sideDirection, -cameraSpeed.current);
      
      // Atualizar a posição do chão para acompanhar a câmera (ilusão de infinito)
      if (planeRef.current) {
        const cameraMovement = new THREE.Vector3().subVectors(
          camera.position, 
          prevCameraPosition.current
        );
        
      if (camera.position.y < minCameraHeight) {
        camera.position.y = minCameraHeight;
      }
        // Movemos o chão na direção oposta ao movimento da câmera
        planeRef.current.position.x -= cameraMovement.x;
        planeRef.current.position.z -= cameraMovement.z;
        
        // "Wrap around" - quando o chão sai muito do centro, reposicionamos
        const planeSizeHalf = planeSize / 2;
        if (planeRef.current.position.x > planeSizeHalf) {
          planeRef.current.position.x -= planeSize;
        } else if (planeRef.current.position.x < -planeSizeHalf) {
          planeRef.current.position.x += planeSize;
        }
        
        if (planeRef.current.position.z > planeSizeHalf) {
          planeRef.current.position.z -= planeSize;
        } else if (planeRef.current.position.z < -planeSizeHalf) {
          planeRef.current.position.z += planeSize;
        }
      }
      
      prevCameraPosition.current.copy(camera.position);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  

  return (
    <div
      ref={mountRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    />
  );
}

