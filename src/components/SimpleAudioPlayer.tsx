import { useEffect, useRef, useState } from 'react';

const SimpleAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const createAmbientSound = async () => {
    try {
      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume context if it's suspended (required for autoplay policy)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      audioContextRef.current = audioContext;

      // Create gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
      gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);

      const oscillators: OscillatorNode[] = [];

      // Create a beautiful ambient chord progression
      // C major chord: C, E, G (261.63, 329.63, 392.00 Hz)
      const chordFrequencies = [261.63, 329.63, 392.00]; // C4, E4, G4
      const chordTypes: OscillatorType[] = ['sine', 'triangle', 'sine'];

      chordFrequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        oscillator.connect(gainNode);
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = chordTypes[index];
        oscillator.start();
        oscillators.push(oscillator);
      });

      // Add a gentle bass note (C3)
      const bassOscillator = audioContext.createOscillator();
      const bassGain = audioContext.createGain();
      bassGain.gain.setValueAtTime(0.03, audioContext.currentTime);
      bassOscillator.connect(bassGain);
      bassGain.connect(audioContext.destination);
      bassOscillator.frequency.setValueAtTime(130.81, audioContext.currentTime); // C3
      bassOscillator.type = 'sine';
      bassOscillator.start();
      oscillators.push(bassOscillator);

      // Add gentle modulation for movement
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      lfo.frequency.setValueAtTime(0.05, audioContext.currentTime); // Very slow modulation
      lfoGain.gain.setValueAtTime(0.02, audioContext.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain);
      lfo.start();
      oscillators.push(lfo);

      // Add a subtle high-frequency sparkle
      const sparkleOscillator = audioContext.createOscillator();
      const sparkleGain = audioContext.createGain();
      sparkleGain.gain.setValueAtTime(0.01, audioContext.currentTime);
      sparkleOscillator.connect(sparkleGain);
      sparkleGain.connect(audioContext.destination);
      sparkleOscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime); // C6
      sparkleOscillator.type = 'sine';
      sparkleOscillator.start();
      oscillators.push(sparkleOscillator);

      oscillatorsRef.current = oscillators;
      setIsPlaying(true);
      console.log('Beautiful ambient sound started');

    } catch (error) {
      console.error('Audio error:', error);
    }
  };

  const stopAmbientSound = () => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        console.log('Oscillator already stopped');
      }
    });
    oscillatorsRef.current = [];
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    setIsPlaying(false);
    console.log('Ambient sound stopped');
  };

  const handleClick = async () => {
    console.log('Button clicked! Current state:', { isPlaying, hasInteracted });
    
    if (!hasInteracted) {
      setHasInteracted(true);
      await createAmbientSound();
    } else {
      if (isPlaying) {
        stopAmbientSound();
      } else {
        await createAmbientSound();
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button
        onClick={handleClick}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 ${
          !hasInteracted
            ? 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-600 animate-pulse'
            : isPlaying 
              ? 'bg-green-500 hover:bg-green-600 text-white border-green-600' 
              : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
        }`}
        title={
          !hasInteracted 
            ? 'Click to enable ambient sound' 
            : isPlaying 
              ? 'Ambient sound playing - Click to stop' 
              : 'Click to play ambient sound'
        }
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
      {!hasInteracted && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Click to enable audio
        </div>
      )}
    </div>
  );
};

export default SimpleAudioPlayer;
