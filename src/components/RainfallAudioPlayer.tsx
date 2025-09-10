import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, CloudRain } from 'lucide-react';

const RainfallAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const [noiseSource, setNoiseSource] = useState<AudioBufferSourceNode | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize audio only after user interaction
  const initAudio = async () => {
    if (audioContext) return;
    
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume context if it's suspended (required for autoplay policy)
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Create rain-like noise
      const bufferSize = 4096;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to make it sound like rain
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.Q.setValueAtTime(1, ctx.currentTime);

      // Connect the audio graph
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      // Set initial volume (muted)
      gain.gain.setValueAtTime(0, ctx.currentTime);

      setAudioContext(ctx);
      setGainNode(gain);
      setNoiseSource(whiteNoise);
      
      console.log('Rainfall audio initialized');
      
    } catch (error) {
      console.error('Failed to initialize rainfall audio:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext]);

  const togglePlayPause = async () => {
    // Initialize audio on first user interaction
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      await initAudio();
    }

    if (!audioContext || !gainNode || !noiseSource) {
      console.log('Audio not initialized yet');
      return;
    }

    try {
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      if (isPlaying) {
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        setIsPlaying(false);
        console.log('Rainfall audio paused');
      } else {
        gainNode.gain.setValueAtTime(isMuted ? 0 : volume, audioContext.currentTime);
        setIsPlaying(true);
        
        // Start the noise source if not already started
        try {
          noiseSource.start();
          console.log('Rainfall audio started');
        } catch (e) {
          // Source might already be started, create a new one
          const newSource = audioContext.createBufferSource();
          newSource.buffer = noiseSource.buffer;
          newSource.loop = true;
          
          // Reconnect to the same filter chain
          const filter = audioContext.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, audioContext.currentTime);
          filter.Q.setValueAtTime(1, audioContext.currentTime);
          
          newSource.connect(filter);
          filter.connect(gainNode);
          newSource.start();
          setNoiseSource(newSource);
          console.log('New rainfall audio source started');
        }
      }
    } catch (error) {
      console.error('Rainfall audio playback error:', error);
    }
  };

  const toggleMute = () => {
    if (!gainNode) return;

    if (isMuted) {
      gainNode.gain.setValueAtTime(isPlaying ? volume : 0, audioContext!.currentTime);
      setIsMuted(false);
    } else {
      gainNode.gain.setValueAtTime(0, audioContext!.currentTime);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (!isMuted && gainNode) {
      gainNode.gain.setValueAtTime(isPlaying ? newVolume : 0, audioContext!.currentTime);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-sky-200">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <CloudRain className="w-5 h-5 text-sky-600" />
          <span className="text-sm font-medium text-sky-800">Rainfall</span>
          {!hasUserInteracted && (
            <span className="text-xs opacity-75">(Click to enable)</span>
          )}
        </div>
        
        <button
          onClick={togglePlayPause}
          className={`p-2 rounded-full transition-colors ${
            !hasUserInteracted 
              ? 'bg-yellow-200 hover:bg-yellow-300 animate-pulse' 
              : 'bg-sky-100 hover:bg-sky-200'
          }`}
          title={!hasUserInteracted ? 'Click to enable audio' : (isPlaying ? 'Pause rainfall' : 'Play rainfall')}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-sky-700" />
          ) : (
            <Play className="w-4 h-4 text-sky-700" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className={`p-2 rounded-full transition-colors ${
            !hasUserInteracted 
              ? 'bg-gray-200 opacity-50 cursor-not-allowed' 
              : 'bg-sky-100 hover:bg-sky-200'
          }`}
          disabled={!hasUserInteracted}
          title={!hasUserInteracted ? 'Enable audio first' : (isMuted ? 'Unmute rainfall' : 'Mute rainfall')}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-sky-700" />
          ) : (
            <Volume2 className="w-4 h-4 text-sky-700" />
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
              !hasUserInteracted 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-sky-200 cursor-pointer'
            }`}
            disabled={!hasUserInteracted}
            title={!hasUserInteracted ? 'Enable audio first' : 'Adjust volume'}
          />
        </div>
      </div>
      
      <audio ref={audioRef} />
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #0ea5e9;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #0ea5e9;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default RainfallAudioPlayer;
