import React, { useRef, useEffect } from 'react'; // 1. Import useEffect
import { useGLTF } from '@react-three/drei'; // Corrected path
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'; // 2. Import * as THREE

export function CarModel(props) {
  // Make sure this path is correct!
  // 3. Get 'materials' from useGLTF
  const { scene, materials } = useGLTF('/car.glb'); 
  const modelRef = useRef();

  // 4. Log materials to find the right name
  // Open your browser console (F12) to see this list!
  useEffect(() => {
    console.log('Model Materials:', materials);
  }, [materials]);


  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5; 
      const time = state.clock.getElapsedTime();
      modelRef.current.position.y = Math.sin(time * 2) * 0.1;
    }
  });

  // 5. This effect runs when the 'customColor' prop changes
  useEffect(() => {
    // Check if the color prop is provided
    if (props.customColor) {
      // Find the material.
      // *** THIS IS A GUESS! ***
      // Check your console.log to find the correct name (e.g., 'paint', 'mat_1')
      const bodyMaterial = materials.car_body; 

      if (bodyMaterial) {
        // Change the material's color
        bodyMaterial.color = new THREE.Color(props.customColor);
      } else {
        console.warn("Could not find material 'body'. Check console for available materials.");
      }
    }
  }, [props.customColor, materials]);


  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      {...props} 
      scale={0.2} 
    />
  );
}

// Make sure this path matches!
useGLTF.preload('/car.glb');