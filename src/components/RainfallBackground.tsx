import React from 'react';

const RainfallBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Sky gradient background */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%)' 
        }}
      />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none" />
      
      {/* Rain streaks for visual effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-sky-300/60 to-transparent animate-rainfall"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 100 + 50}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
            }}
          />
        ))}
      </div>
      
      {/* Additional rain droplets */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`droplet-${i}`}
            className="absolute w-1 h-6 bg-gradient-to-b from-sky-400/40 to-sky-500/60 rounded-full animate-rainfall-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${-10}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Water ripples */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`ripple-${i}`}
            className="absolute w-20 h-20 border border-sky-300/20 rounded-full animate-ripple"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 2 + 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RainfallBackground;
