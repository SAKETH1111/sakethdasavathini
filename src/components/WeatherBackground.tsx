import React, { useState, useEffect } from 'react';

type WeatherType = 'spring' | 'summer' | 'autumn' | 'winter' | 'storm' | 'sunset';

interface WeatherBackgroundProps {
  weather: WeatherType;
}

const WeatherBackground = ({ weather }: WeatherBackgroundProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate particles based on weather type
    const generateParticles = () => {
      const newParticles = [];
      let particleCount = 0;

      switch (weather) {
        case 'spring':
          particleCount = 60; // Cherry blossoms
          break;
        case 'summer':
          particleCount = 40; // Sun rays and butterflies
          break;
        case 'autumn':
          particleCount = 80; // Falling leaves
          break;
        case 'winter':
          particleCount = 150; // Snowflakes
          break;
        case 'storm':
          particleCount = 120; // Rain and lightning
          break;
        case 'sunset':
          particleCount = 30; // Gentle particles
          break;
        default:
          particleCount = 50;
      }

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 2
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [weather]);

  const getWeatherConfig = () => {
    switch (weather) {
      case 'spring':
        return {
          background: 'linear-gradient(180deg, #FFE4E1 0%, #FFB6C1 50%, #FFC0CB 100%)',
          particles: 'cherry-blossoms',
          animation: 'cherry-blossom-fall'
        };
      case 'summer':
        return {
          background: 'linear-gradient(180deg, #87CEEB 0%, #98D8E8 50%, #F0E68C 100%)',
          particles: 'sun-rays',
          animation: 'sunshine'
        };
      case 'autumn':
        return {
          background: 'linear-gradient(180deg, #F0FFF0 0%, #E6FFE6 50%, #F5FFF5 100%)',
          particles: 'leaves',
          animation: 'leaf-fall'
        };
      case 'winter':
        return {
          background: 'linear-gradient(180deg, #E6E6FA 0%, #B0C4DE 50%, #F0F8FF 100%)',
          particles: 'snowflakes',
          animation: 'snowfall'
        };
      case 'storm':
        return {
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 30%, #0f3460 70%, #533483 100%)',
          particles: 'rain',
          animation: 'rainfall'
        };
      case 'sunset':
        return {
          background: 'linear-gradient(180deg, #FF6347 0%, #FF7F50 50%, #FFA500 100%)',
          particles: 'gentle',
          animation: 'gentle-drift'
        };
      default:
        return {
          background: 'linear-gradient(180deg, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%)',
          particles: 'rain',
          animation: 'rainfall'
        };
    }
  };

  const config = getWeatherConfig();

  const renderParticles = () => {
    return particles.map((particle) => {
      const baseStyle = {
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        animationDelay: `${particle.delay}s`,
        animationDuration: `${particle.duration}s`
      };

      switch (weather) {
        case 'spring':
          return (
            <div
              key={particle.id}
              className="absolute w-4 h-4 bg-pink-400/70 rounded-full animate-cherry-blossom-fall"
              style={baseStyle}
            />
          );
        case 'summer':
          return (
            <div
              key={particle.id}
              className="absolute w-3 h-10 bg-yellow-400/60 rounded-full animate-sunshine"
              style={baseStyle}
            />
          );
        case 'autumn':
          return (
            <div
              key={particle.id}
              className="absolute w-5 h-5 bg-orange-700/95 rounded-sm animate-leaf-fall"
              style={baseStyle}
            />
          );
        case 'winter':
          return (
            <div
              key={particle.id}
              className="absolute w-3 h-3 bg-white rounded-full animate-snowfall"
              style={baseStyle}
            />
          );
        case 'storm':
          return (
            <div
              key={particle.id}
              className="absolute w-px h-12 bg-blue-300/80 rounded-full animate-rainfall"
              style={baseStyle}
            />
          );
        case 'sunset':
          return (
            <div
              key={particle.id}
              className="absolute w-3 h-3 bg-orange-400/60 rounded-full animate-gentle-drift"
              style={baseStyle}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="fixed inset-0 z-0">
      {/* Weather background */}
      <div 
        className="absolute inset-0 transition-all duration-2000 ease-in-out"
        style={{ background: config.background }}
      />
      
      {/* Weather-specific overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {weather === 'spring' && (
          <div className="absolute inset-0 bg-gradient-to-b from-pink-200/20 via-transparent to-pink-100/30 transition-all duration-2000 ease-in-out" />
        )}
        {weather === 'summer' && (
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-200/20 via-transparent to-orange-100/20 transition-all duration-2000 ease-in-out" />
        )}
        {weather === 'autumn' && (
          <div className="absolute inset-0 bg-gradient-to-b from-green-100/20 via-transparent to-green-50/30 transition-all duration-2000 ease-in-out" />
        )}
        {weather === 'winter' && (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100/30 via-transparent to-white/20 transition-all duration-2000 ease-in-out" />
        )}
        {weather === 'storm' && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-800/30 to-gray-700/40 transition-all duration-2000 ease-in-out" />
        )}
        {weather === 'sunset' && (
          <div className="absolute inset-0 bg-gradient-to-b from-orange-200/30 via-transparent to-red-100/20 transition-all duration-2000 ease-in-out" />
        )}
      </div>
      
      {/* Weather particles */}
      <div className="absolute inset-0 pointer-events-none">
        {renderParticles()}
      </div>
      
      {/* Special effects */}
      {weather === 'storm' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`lightning-${i}`}
              className="absolute w-1 h-40 bg-white animate-lightning"
              style={{
                left: `${15 + i * 20}%`,
                top: '5%',
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: '0.2s'
              }}
            />
          ))}
          {/* Additional lightning flashes */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`flash-${i}`}
              className="absolute inset-0 bg-white/20 animate-lightning"
              style={{
                animationDelay: `${Math.random() * 6 + 2}s`,
                animationDuration: '0.1s'
              }}
            />
          ))}
        </div>
      )}
      
      {weather === 'summer' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400/70 rounded-full animate-pulse" />
          <div className="absolute top-20 right-20 w-10 h-10 bg-yellow-300/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-30 right-30 w-6 h-6 bg-yellow-200/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      )}
      
      {weather === 'spring' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-12 h-12 bg-pink-300/40 rounded-full animate-float" />
          <div className="absolute top-40 right-40 w-8 h-8 bg-pink-200/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        </div>
      )}
      
      {weather === 'autumn' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-30 left-30 w-16 h-16 bg-orange-400/30 rounded-full animate-float" />
          <div className="absolute top-50 right-20 w-10 h-10 bg-orange-300/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>
      )}
      
      {weather === 'winter' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-14 h-14 bg-blue-200/20 rounded-full animate-float" />
          <div className="absolute top-40 right-30 w-8 h-8 bg-blue-100/15 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
      )}
      
      {weather === 'sunset' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-18 h-18 bg-orange-500/40 rounded-full animate-pulse" />
          <div className="absolute top-40 left-40 w-12 h-12 bg-red-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;
