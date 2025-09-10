import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, CloudRain, Sun, Leaf, Snowflake, Zap, Sunset } from 'lucide-react';

type WeatherType = 'spring' | 'summer' | 'autumn' | 'winter' | 'storm' | 'sunset';

interface WeatherAudioPlayerProps {
  weather: WeatherType;
}

const WeatherAudioPlayer = ({ weather }: WeatherAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const [noiseSource, setNoiseSource] = useState<AudioBufferSourceNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [currentWeatherType, setCurrentWeatherType] = useState<WeatherType>(weather);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize Web Audio API and start playing automatically
  const initAudio = async () => {
    if (isInitialized) return;
    
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume context if it's suspended (required for autoplay policy)
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      
      const gain = ctx.createGain();
      
      // Create white noise buffer
      const bufferSize = 2 * ctx.sampleRate; // 2 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      
      // Create filter for weather-specific sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      
      // Configure filter based on weather
      configureFilterForWeather(filter, weather);
      
      // Connect audio graph
      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      // Set initial volume and start playing
      gain.gain.value = volume;
      
      setAudioContext(ctx);
      setGainNode(gain);
      setNoiseSource(source);
      setIsInitialized(true);
      setIsPlaying(true);
      setHasUserInteracted(true);
      
      // Start the audio source
      source.start();
      
      console.log('Audio initialized and started for weather:', weather);
      
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      // Don't set isInitialized to true if there was an error
      throw error; // Re-throw so the caller knows it failed
    }
  };

  // Configure filter based on weather type
  const configureFilterForWeather = (filter: BiquadFilterNode, weatherType: WeatherType) => {
    switch (weatherType) {
      case 'spring':
        filter.frequency.value = 800;
        filter.Q.value = 0.5;
        break;
      case 'summer':
        filter.frequency.value = 1200;
        filter.Q.value = 1;
        break;
      case 'autumn':
        filter.frequency.value = 600;
        filter.Q.value = 1.5;
        break;
      case 'winter':
        filter.frequency.value = 400;
        filter.Q.value = 0.8;
        break;
      case 'storm':
        filter.frequency.value = 1000;
        filter.Q.value = 2;
        break;
      case 'sunset':
        filter.frequency.value = 500;
        filter.Q.value = 0.3;
        break;
      default:
        filter.frequency.value = 800;
        filter.Q.value = 1;
    }
  };

  // Auto-initialize audio on first load
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Try to initialize immediately
        await initAudio();
      } catch (error) {
        console.log('Audio initialization failed, waiting for user interaction:', error);
        // If that fails due to autoplay policy, wait for user interaction
        const handleFirstInteraction = async () => {
          try {
            await initAudio();
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
          } catch (e) {
            console.error('Failed to initialize audio on user interaction:', e);
          }
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
      }
    };

    initializeAudio();
  }, []);

  // Handle weather changes - update audio filter
  useEffect(() => {
    if (isInitialized && audioContext && gainNode && weather !== currentWeatherType) {
      console.log('Switching audio from', currentWeatherType, 'to', weather);
      
      // Create new filter for the new weather
      const newFilter = audioContext.createBiquadFilter();
      newFilter.type = 'lowpass';
      configureFilterForWeather(newFilter, weather);
      
      // Disconnect old filter and connect new one
      if (noiseSource) {
        noiseSource.disconnect();
        noiseSource.connect(newFilter);
        newFilter.connect(gainNode);
      }
      
      setCurrentWeatherType(weather);
      console.log('Audio successfully switched to weather:', weather);
    }
  }, [weather, isInitialized, audioContext, gainNode, noiseSource, currentWeatherType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext]);

  const togglePlayPause = async () => {
    // If not initialized, try to initialize
    if (!isInitialized) {
      try {
        await initAudio();
      } catch (error) {
        console.error('Failed to initialize audio on button click:', error);
      }
      return;
    }

    if (!audioContext || !gainNode) {
      console.log('Audio not initialized yet');
      return;
    }

    try {
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      if (isPlaying) {
        gainNode.gain.value = 0;
        setIsPlaying(false);
        console.log('Audio paused');
      } else {
        gainNode.gain.value = isMuted ? 0 : volume;
        setIsPlaying(true);
        console.log('Audio resumed');
      }
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  const toggleMute = () => {
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
    if (!isMuted && gainNode) {
      gainNode.gain.value = isPlaying ? newVolume : 0;
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
        return 'Falling Leaves';
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
          {!isInitialized && (
            <span className="text-xs opacity-75">(Click to enable audio)</span>
          )}
        </div>
        
        <button
          onClick={togglePlayPause}
          className={`p-2 rounded-full transition-colors ${
            !isInitialized 
              ? 'bg-yellow-200 hover:bg-yellow-300 animate-pulse' 
              : 'bg-white/80 hover:bg-white'
          }`}
          title={!isInitialized ? 'Click to enable audio' : (isPlaying ? 'Pause audio' : 'Play audio')}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className={`p-2 rounded-full transition-colors ${
            !isInitialized 
              ? 'bg-gray-200 opacity-50 cursor-not-allowed' 
              : 'bg-white/80 hover:bg-white'
          }`}
          disabled={!isInitialized}
          title={!isInitialized ? 'Audio initializing...' : (isMuted ? 'Unmute audio' : 'Mute audio')}
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
            className={`w-16 h-1 rounded-lg appearance-none slider ${
              !isInitialized 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-white/60 cursor-pointer'
            }`}
            disabled={!isInitialized}
            title={!isInitialized ? 'Audio initializing...' : 'Adjust volume'}
          />
        </div>
      </div>
      
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

export default WeatherAudioPlayer;
