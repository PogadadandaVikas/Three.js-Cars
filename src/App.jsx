import React, { Suspense, useState } from 'react'; // 1. Import useState
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls, 
  Environment,
} from "@react-three/drei"; // Corrected path
import { CarModel } from './CarModel';
import './App.css'; // We'll update this next

function App() {
  // 2. Add state for the color
  const [color, setColor] = useState('#ffffff'); // Default to white

  return (
    <div className="App">
      <header>
        <h1>My Awesome 3D Car Site</h1>
        <p>Drag, pan, and zoom the car!</p>
      </header>

      {/* 3. Add the color palette UI */}
      <div className="color-palette">
        <button className="color-swatch" style={{ backgroundColor: '#ffffff' }} onClick={() => setColor('#ffffff')}></button>
        <button className="color-swatch" style={{ backgroundColor: '#ff0000' }} onClick={() => setColor('#ff0000')}></button>
        <button className="color-swatch" style={{ backgroundColor: '#0000ff' }} onClick={() => setColor('#0000ff')}></button>
        <button className="color-swatch" style={{ backgroundColor: '#444444' }} onClick={() => setColor('#444444')}></button>
      </div>

      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} className="canvas-container">
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, -10, -5]} intensity={1} />

          {/* 4. Pass the color state as a prop */}
          <CarModel customColor={color} />

          <Environment preset="city" />
        </Suspense>

        <OrbitControls enableZoom={true} />
      </Canvas>

      <footer>
        <p>Scroll down for more content.</p>
      </footer>
    </div>
  );
}

export default App;