import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useTheme } from '@mui/material/styles';
import { OrbitControls, Stars, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

const LightModeScene = () => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <Sphere args={[1.5, 32, 32]}>
      <MeshDistortMaterial
        color="#90caf9"
        distort={0.4}
        speed={2}
        roughness={0.2}
      />
    </Sphere>
  </Float>
);

const DarkModeScene = () => (
  <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
);

const Background3D = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Canvas
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
      }}
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      {isDark ? <DarkModeScene /> : <LightModeScene />}
    </Canvas>
  );
};

export default Background3D;
