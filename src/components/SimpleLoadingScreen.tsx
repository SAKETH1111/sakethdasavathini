import { useState, useEffect } from 'react';
import SimpleWeatherAudioPlayer from './SimpleWeatherAudioPlayer';
import { CloudRain, Sun, Leaf, Snowflake, Zap, Sunset } from 'lucide-react';

// Weather-themed loading screen with seasonal animations
const SimpleLoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [currentWeather, setCurrentWeather] = useState<'spring' | 'summer' | 'autumn' | 'winter' | 'storm' | 'sunset'>('spring');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 1000);
    const timer2 = setTimeout(() => setPhase(2), 2500);
    const timer3 = setTimeout(() => setPhase(3), 4000);
    const timer4 = setTimeout(() => {
      setPhase(4);
      setOpacity(0);
      setTimeout(onComplete, 1000);
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  // Cycle through weather themes during loading
  useEffect(() => {
    const weatherCycle = ['spring', 'summer', 'autumn', 'winter', 'storm', 'sunset'];
    let currentIndex = 0;
    
    const weatherTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % weatherCycle.length;
      setCurrentWeather(weatherCycle[currentIndex] as any);
    }, 800);

    return () => clearInterval(weatherTimer);
  }, []);

  const getWeatherConfig = () => {
    switch (currentWeather) {
      case 'spring':
        return {
          background: 'linear-gradient(180deg, #FFE4E1 0%, #FFB6C1 50%, #FFC0CB 100%)',
          textColor: 'text-pink-800',
          accentColor: 'text-pink-600',
          particles: 'cherry-blossoms',
          icon: <Leaf className="w-8 h-8 text-pink-600" />
        };
      case 'summer':
        return {
          background: 'linear-gradient(180deg, #87CEEB 0%, #98D8E8 50%, #F0E68C 100%)',
          textColor: 'text-yellow-800',
          accentColor: 'text-yellow-600',
          particles: 'sun-rays',
          icon: <Sun className="w-8 h-8 text-yellow-600" />
        };
      case 'autumn':
        return {
          background: 'linear-gradient(180deg, #D2691E 0%, #CD853F 50%, #DEB887 100%)',
          textColor: 'text-orange-800',
          accentColor: 'text-orange-600',
          particles: 'leaves',
          icon: <Leaf className="w-8 h-8 text-orange-600" />
        };
      case 'winter':
        return {
          background: 'linear-gradient(180deg, #E6E6FA 0%, #B0C4DE 50%, #F0F8FF 100%)',
          textColor: 'text-blue-800',
          accentColor: 'text-blue-600',
          particles: 'snowflakes',
          icon: <Snowflake className="w-8 h-8 text-blue-600" />
        };
      case 'storm':
        return {
          background: 'linear-gradient(180deg, #2F4F4F 0%, #708090 50%, #A9A9A9 100%)',
          textColor: 'text-white',
          accentColor: 'text-yellow-400',
          particles: 'rain',
          icon: <Zap className="w-8 h-8 text-yellow-400" />
        };
      case 'sunset':
        return {
          background: 'linear-gradient(180deg, #FF6347 0%, #FF7F50 50%, #FFA500 100%)',
          textColor: 'text-orange-800',
          accentColor: 'text-orange-600',
          particles: 'gentle',
          icon: <Sunset className="w-8 h-8 text-orange-600" />
        };
      default:
        return {
          background: 'linear-gradient(180deg, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%)',
          textColor: 'text-sky-800',
          accentColor: 'text-sky-600',
          particles: 'rain',
          icon: <CloudRain className="w-8 h-8 text-sky-600" />
        };
    }
  };

  const config = getWeatherConfig();

  const renderWeatherParticles = () => {
    const particleCount = 30;
    return Array.from({ length: particleCount }).map((_, i) => {
      const baseStyle = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      };

      switch (currentWeather) {
        case 'spring':
          return (
            <div
              key={i}
              className="absolute w-3 h-3 bg-pink-300/60 rounded-full animate-cherry-blossom-fall"
              style={baseStyle}
            />
          );
        case 'summer':
          return (
            <div
              key={i}
              className="absolute w-2 h-8 bg-yellow-300/40 rounded-full animate-sunshine"
              style={baseStyle}
            />
          );
        case 'autumn':
          return (
            <div
              key={i}
              className="absolute w-4 h-4 bg-orange-500/60 rounded-sm animate-leaf-fall"
              style={baseStyle}
            />
          );
        case 'winter':
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/80 rounded-full animate-snowfall"
              style={baseStyle}
            />
          );
        case 'storm':
          return (
            <div
              key={i}
              className="absolute w-px h-8 bg-blue-400/60 rounded-full animate-rainfall"
              style={baseStyle}
            />
          );
        case 'sunset':
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-300/40 rounded-full animate-gentle-drift"
              style={baseStyle}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000"
      style={{ 
        background: config.background,
        opacity 
      }}
    >
      {/* Weather particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {renderWeatherParticles()}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Weather icon */}
        <div className="mb-6 animate-bounce">
          {config.icon}
        </div>

        {/* Name animation */}
        <div className="mb-8">
          <h1 
            className={`text-8xl md:text-9xl font-bold transition-all duration-1000 ${config.textColor} ${
              phase >= 1 ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-50'
            }`}
            style={{
              textShadow: currentWeather === 'storm' ? '0 0 20px #FFD700, 0 0 40px #FFD700' : '0 0 20px rgba(0,0,0,0.3), 0 0 40px rgba(0,0,0,0.2)',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
            }}
          >
            Saketh
          </h1>
          
          <h2 
            className={`text-6xl md:text-7xl font-bold transition-all duration-1000 ${config.accentColor} ${
              phase >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
            }`}
            style={{
              textShadow: currentWeather === 'storm' ? '0 0 15px #FFD700' : '0 0 15px rgba(0,0,0,0.2)',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
            }}
          >
            Dasavathini
          </h2>
          
          <p 
            className={`text-2xl md:text-3xl mt-4 transition-all duration-1000 ${
              currentWeather === 'storm' ? 'text-white' : config.textColor
            } ${
              phase >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-5'
            }`}
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
            }}
          >
            Full Stack Engineer
          </p>
        </div>

        {/* Weather-themed loading progress */}
        <div className="w-80 h-2 bg-white/20 rounded-full overflow-hidden mx-auto backdrop-blur-sm">
          <div 
            className="h-full rounded-full transition-all duration-1000"
            style={{ 
              background: currentWeather === 'spring' ? 'linear-gradient(90deg, #FFB6C1, #FFC0CB)' :
                         currentWeather === 'summer' ? 'linear-gradient(90deg, #87CEEB, #F0E68C)' :
                         currentWeather === 'autumn' ? 'linear-gradient(90deg, #D2691E, #DEB887)' :
                         currentWeather === 'winter' ? 'linear-gradient(90deg, #B0C4DE, #F0F8FF)' :
                         currentWeather === 'storm' ? 'linear-gradient(90deg, #708090, #A9A9A9)' :
                         'linear-gradient(90deg, #FF6347, #FFA500)',
              width: phase === 0 ? '0%' : 
                     phase === 1 ? '25%' : 
                     phase === 2 ? '50%' : 
                     phase === 3 ? '75%' : '100%' 
            }}
          />
        </div>
        
        <p className={`text-center mt-4 text-lg transition-colors duration-500 ${
          currentWeather === 'storm' ? 'text-white' : config.textColor
        }`}>
          {phase === 0 ? 'Initializing...' : 
           phase === 1 ? 'Loading Experience...' : 
           phase === 2 ? 'Preparing Portfolio...' : 
           phase === 3 ? 'Almost Ready...' :
           'Welcome!'}
        </p>

        {/* Weather status */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className={`text-sm transition-colors duration-500 ${
            currentWeather === 'storm' ? 'text-white' : config.textColor
          }`}>
            Current Weather:
          </span>
          <span className={`text-sm font-semibold transition-colors duration-500 ${config.accentColor}`}>
            {currentWeather.charAt(0).toUpperCase() + currentWeather.slice(1)}
          </span>
        </div>
        
        {/* Audio instruction */}
        <div className="mt-6 text-center">
          <p className={`text-sm mb-2 transition-colors duration-500 ${
            currentWeather === 'storm' ? 'text-white/80' : 'text-gray-600'
          }`}>
            Click the audio button to enable ambient weather sounds
          </p>
        </div>
      </div>

      {/* Weather audio player */}
      <SimpleWeatherAudioPlayer weather={currentWeather} />
    </div>
  );
};


export default SimpleLoadingScreen;
