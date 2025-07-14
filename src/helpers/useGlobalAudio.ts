"use client"
import { useEffect, useState } from 'react';

let globalAudioUnlocked = false;
let unlockListeners: (() => void)[] = [];

export const useGlobalAudio = () => {
  const [audioUnlocked, setAudioUnlocked] = useState(globalAudioUnlocked);

  useEffect(() => {
    // Check localStorage for persisted unlock state
    const stored = localStorage.getItem('globalAudioUnlocked');
    if (stored === 'true') {
      globalAudioUnlocked = true;
      setAudioUnlocked(true);
    }

    // Add this component to listeners
    const updateListener = () => setAudioUnlocked(globalAudioUnlocked);
    unlockListeners.push(updateListener);

    return () => {
      // Remove listener on cleanup
      unlockListeners = unlockListeners.filter(l => l !== updateListener);
    };
  }, []);

  const unlockAudio = async () => {
    if (globalAudioUnlocked) return true;

    try {
      // Create a very short audio to unlock the audio context
      const audio = new Audio();
      audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYIJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYIJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYIJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYIJHfH8N2QQAoUXrTp66hVFApGn+DyvmUdCG+LwpJ8QjsAIYTJ8tOIOwYXZLnt6qBUEwk+n+Hqwm8fBjGN0fzOUyYI';
      
      // Set volume to nearly silent but not zero
      audio.volume = 0.01;
      
      // Play and immediately pause to unlock
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        audio.pause();
      }
      
      globalAudioUnlocked = true;
      localStorage.setItem('globalAudioUnlocked', 'true');
      
      // Notify all listeners
      unlockListeners.forEach(listener => listener());
      
      return true;
    } catch (error) {
      console.log('Global audio unlock failed:', error);
      return false;
    }
  };

  return { audioUnlocked, unlockAudio };
};

// Global audio unlock component that can be used anywhere
export const GlobalAudioUnlocker = () => {
  const { audioUnlocked, unlockAudio } = useGlobalAudio();

  useEffect(() => {
    if (audioUnlocked) return;

    let isUnlocking = false;
    
    const handleUserInteraction = async (e: Event) => {
      if (isUnlocking || globalAudioUnlocked) return;
      isUnlocking = true;
   
      const success = await unlockAudio();
      
      if (success) {
        // Remove all event listeners after successful unlock
        unlockEvents.forEach(event => {
          document.removeEventListener(event, handleUserInteraction, true);
        });
      } else {
        isUnlocking = false;
      }
    };

    // List of events that can unlock audio
    const unlockEvents = ['mousedown', 'mouseup', 'click', 'touchstart', 'touchend', 'keydown', 'keyup'];
    
    // Add listeners for user interaction
    unlockEvents.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { capture: true, once: false });
    });

    return () => {
      // Cleanup listeners
      unlockEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction, true);
      });
    };
  }, [audioUnlocked, unlockAudio]);

  return null; // This component doesn't render anything
}; 