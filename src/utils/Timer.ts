import { useState, useRef, useEffect, useCallback } from 'react';

export function useTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    if (startTimeRef.current) {
      setElapsed(Date.now() - startTimeRef.current);
      rafRef.current = requestAnimationFrame(update);
    }
  }, []);

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    setElapsed(0);
    setIsRunning(true);
    update();
  }, [update]);

  const stop = useCallback(() => {
    setIsRunning(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    // Final update for precision
    if (startTimeRef.current) {
      setElapsed(Date.now() - startTimeRef.current);
    }
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setElapsed(0);
    startTimeRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { elapsed, isRunning, start, stop, reset };
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const millis = Math.floor((ms % 1000) / 10); // 2 digits
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${millis.toString().padStart(2, '0')}s`;
  }
  return `${remainingSeconds}.${millis.toString().padStart(2, '0')}s`;
}
