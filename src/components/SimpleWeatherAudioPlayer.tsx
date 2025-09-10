import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, CloudRain, Sun, Leaf, Snowflake, Zap, Sunset } from 'lucide-react';

type WeatherType = 'spring' | 'summer' | 'autumn' | 'winter' | 'storm' | 'sunset';

interface SimpleWeatherAudioPlayerProps {
  weather: WeatherType;
}

const SimpleWeatherAudioPlayer = ({ weather }: SimpleWeatherAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Generate simple weather sounds using Web Audio API
  useEffect(() => {
    if (!audioRef.current) return;

    const generateWeatherSound = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const sampleRate = audioContext.sampleRate;
        const duration = 2; // 2 seconds
        const bufferSize = sampleRate * duration;
        
        const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate different sounds based on weather
        for (let i = 0; i < bufferSize; i++) {
          const t = i / sampleRate;
          let sample = 0;
          
          switch (weather) {
            case 'spring':
              // Gentle wind with bird-like chirps
              sample = Math.sin(2 * Math.PI * 200 * t) * 0.1 + 
                      Math.sin(2 * Math.PI * 400 * t) * 0.05 * Math.random();
              break;
            case 'summer':
              // Warm breeze with cicadas
              sample = Math.sin(2 * Math.PI * 300 * t) * 0.1 + 
                      Math.sin(2 * Math.PI * 600 * t) * 0.05 * Math.random();
              break;
            case 'autumn':
              // Rustling leaves
              sample = (Math.random() - 0.5) * 0.1 * Math.sin(2 * Math.PI * 100 * t);
              break;
            case 'winter':
              // Cold wind
              sample = Math.sin(2 * Math.PI * 150 * t) * 0.1 + 
                      (Math.random() - 0.5) * 0.05;
              break;
            case 'storm':
              // Rain and thunder
              sample = (Math.random() - 0.5) * 0.2 + 
                      Math.sin(2 * Math.PI * 80 * t) * 0.1;
              break;
            case 'sunset':
              // Gentle evening sounds
              sample = Math.sin(2 * Math.PI * 250 * t) * 0.08 + 
                      Math.sin(2 * Math.PI * 500 * t) * 0.03;
              break;
            default:
              sample = Math.sin(2 * Math.PI * 200 * t) * 0.1;
          }
          
          data[i] = sample;
        }
        
        // Create audio source
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        
        // Create gain node for volume control
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0;
        
        // Connect audio graph
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Store references
        (audioRef.current as any).audioContext = audioContext;
        (audioRef.current as any).source = source;
        (audioRef.current as any).gainNode = gainNode;
        
        // Start the source
        source.start();
        
      } catch (error) {
        console.error('Failed to generate weather sound:', error);
      }
    };

    generateWeatherSound();

    return () => {
      if (audioRef.current) {
        const source = (audioRef.current as any).source;
        const audioContext = (audioRef.current as any).audioContext;
        if (source) {
          try {
            source.stop();
          } catch (e) {
            // Ignore cleanup errors
          }
        }
        if (audioContext) {
          try {
            audioContext.close();
          } catch (e) {
            // Ignore cleanup errors
          }
        }
      }
    };
  }, [weather]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    const audioContext = (audioRef.current as any).audioContext;
    const gainNode = (audioRef.current as any).gainNode;

    if (!audioContext || !gainNode) return;

    try {
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      if (isPlaying) {
        gainNode.gain.value = 0;
        setIsPlaying(false);
      } else {
        gainNode.gain.value = isMuted ? 0 : volume;
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    const gainNode = (audioRef.current as any).gainNode;
    if (!gainNode) return;

    if (isMuted) {
      gainNode.gain.value = isPlaying ? volume : 0;
      setIsMuted(false);
    } else {
      gainNode.gain.value = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (!isMuted && audioRef.current) {
      const gainNode = (audioRef.current as any).gainNode;
      if (gainNode) {
        gainNode.gain.value = isPlaying ? newVolume : 0;
      }
    }
  };

  const getWeatherIcon = () => {
    switch (weather) {
      case 'spring':
        return <Leaf className="w-5 h-5 text-pink-600" />;
      case 'summer':
        return <Sun className="w-5 h-5 text-yellow-600" />;
      case 'autumn':
        return <Leaf className="w-5 h-5 text-orange-600" />;
      case 'winter':
        return <Snowflake className="w-5 h-5 text-blue-600" />;
      case 'storm':
        return <Zap className="w-5 h-5 text-gray-600" />;
      case 'sunset':
        return <Sunset className="w-5 h-5 text-orange-600" />;
      default:
        return <CloudRain className="w-5 h-5 text-sky-600" />;
    }
  };

  const getWeatherName = () => {
    switch (weather) {
      case 'spring':
        return 'Spring Breeze';
      case 'summer':
        return 'Summer Sun';
      case 'autumn':
        return 'Autumn Wind';
      case 'winter':
        return 'Winter Snow';
      case 'storm':
        return 'Thunderstorm';
      case 'sunset':
        return 'Sunset Serenade';
      default:
        return 'Weather';
    }
  };

  const getWeatherColors = () => {
    switch (weather) {
      case 'spring':
        return 'bg-pink-100 border-pink-200 text-pink-800';
      case 'summer':
        return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      case 'autumn':
        return 'bg-orange-100 border-orange-200 text-orange-800';
      case 'winter':
        return 'bg-blue-100 border-blue-200 text-blue-800';
      case 'storm':
        return 'bg-gray-100 border-gray-200 text-gray-800';
      case 'sunset':
        return 'bg-orange-100 border-orange-200 text-orange-800';
      default:
        return 'bg-sky-100 border-sky-200 text-sky-800';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-[9999] ${getWeatherColors()} backdrop-blur-sm rounded-lg p-3 shadow-lg border`}>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {getWeatherIcon()}
          <span className="text-sm font-medium">{getWeatherName()}</span>
        </div>
        
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-1 bg-white/60 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
      
      <audio ref={audioRef} />
      
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default SimpleWeatherAudioPlayer;
