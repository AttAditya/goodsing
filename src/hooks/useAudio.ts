import { useEffect, useRef, useState } from "react";

export function useAudio(audioUrl: string) {
  const [playing, setPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const onendedHandler = useRef<() => void>(() => {});
  const ontickHandler = useRef<(time: number) => void>(() => {});
  const speedRef = useRef<number>(1);

  const reset = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    resume();
  };

  const resume = async () => {
    await audioRef.current?.play().catch(() => {});
    setPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const setFinishHandler = (handler: () => void) => {
    onendedHandler.current = handler;
  };

  const setTickHandler = (handler: (time: number) => void) => {
    ontickHandler.current = handler;
  };

  const setTime = (time: number) => {
    if (audioRef.current)
      audioRef.current.currentTime = time;
  };

  const setSpeed = (speed: number) => {
    speedRef.current = speed;
    if (audioRef.current)
      audioRef.current.playbackRate = speed;
  };

  useEffect(() => {
    setAudioReady(false);
    audioRef.current = new Audio(audioUrl);
    audioRef.current.onended = onendedHandler.current;
    audioRef.current.oncanplaythrough = () => setAudioReady(true);
    audioRef.current.playbackRate = speedRef.current;
    audioRef.current.ontimeupdate = () => {
      ontickHandler.current(audioRef.current?.currentTime || 0);
    };
    
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      setAudioReady(false);
    };
  }, [audioUrl]);

  return {
    audioReady,
    playing,
    reset,
    resume,
    pause,
    setFinishHandler,
    setTickHandler,
    setTime,
    setSpeed,
  }
}

