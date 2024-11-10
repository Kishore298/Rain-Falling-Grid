import React from 'react';
import RainGrid from './components/RainGrid';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen w-full  bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
      <RainGrid />
      <ParticleBackground />
    </div>
  );
}

export default App;

