import { useState } from "react";

export function useLyricsSync(
  lyrics: { timestamp: number }[],
) {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  
  const updateLyricIndex = (time: number) => {
    setCurrentLyricIndex(() => {
      for (let i = 0; i < lyrics.length; i++) {
        if (time * 1000 < lyrics[i].timestamp) {
          return Math.max(0, i - 1);
        }
      }
      
      return lyrics.length - 1;
    });
  };

  const lyricTimestamp = (index: number) => {
    return (lyrics[index]?.timestamp || 0) / 1000;
  }

  return {
    currentLyricIndex,
    updateLyricIndex,
    lyricTimestamp,
  };
}

