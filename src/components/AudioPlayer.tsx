import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  onPlay?: () => void;
  onError?: () => void;
}

const AudioPlayer = ({ onPlay, onError }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Debug log to ensure component is rendering
  console.log('AudioPlayer rendered, isPlaying:', isPlaying, 'hasInteracted:', hasInteracted);

  // Create a simple ambient sound using Web Audio API
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let oscillators: OscillatorNode[] = [];
    let gainNode: GainNode | null = null;

    const createAmbientSound = async () => {
      if (isPlaying) return;
      
      try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Resume context if it's suspended
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }
        
        gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

        // Create a simple, pleasant ambient sound
        const frequencies = [220, 330]; // A3, E4
        const types: OscillatorType[] = ['sine', 'triangle'];

        frequencies.forEach((freq, index) => {
          const oscillator = audioContext!.createOscillator();
          oscillator.connect(gainNode!);
          oscillator.frequency.setValueAtTime(freq, audioContext!.currentTime);
          oscillator.type = types[index];
          oscillator.start();
          oscillators.push(oscillator);
        });

        // Add gentle modulation for movement
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();
        lfo.frequency.setValueAtTime(0.1, audioContext.currentTime);
        lfoGain.gain.setValueAtTime(0.05, audioContext.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(gainNode!.gain);
        lfo.start();
        oscillators.push(lfo);

        setIsPlaying(true);
        onPlay?.();
        console.log('Ambient audio started successfully');

      } catch (error) {
        console.error('Audio error:', error);
        onError?.();
      }
    };

    const stopAudio = () => {
      oscillators.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillator might already be stopped
        }
      });
      oscillators = [];
      if (audioContext) {
        audioContext.close();
        audioContext = null;
      }
      setIsPlaying(false);
      console.log('Audio stopped');
    };

    const handleUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        createAmbientSound();
        
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      } else {
        // Toggle audio on/off
        if (isPlaying) {
          stopAudio();
        } else {
          createAmbientSound();
        }
      }
    };

    // Add event listeners
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    return () => {
      oscillators.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillator might already be stopped
        }
      });
      if (audioContext) {
        audioContext.close();
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [isPlaying, hasInteracted, onPlay, onError]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button
        onClick={() => {
          console.log('Audio button clicked! isPlaying:', isPlaying, 'hasInteracted:', hasInteracted);
          handleUserInteraction();
        }}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 ${
          isPlaying 
            ? 'bg-green-500 hover:bg-green-600 text-white border-green-600' 
            : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
        }`}
        title={isPlaying ? 'Audio playing - Click to stop' : 'Click to enable audio'}
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {isPlaying ? (
          <div className="w-6 h-6 bg-white rounded-sm"></div>
        ) : (
          <div className="w-0 h-0 border-l-[12px] border-l-current border-y-[8px] border-y-transparent ml-1"></div>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
