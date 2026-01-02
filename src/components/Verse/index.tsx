import "./styles.css";

import { useCallback, useEffect, useRef, useState } from "react";
import { LoaderCircle, Pause, Play, Rewind } from "lucide-react";

import { VerseData } from "@interfaces/index";

export function Verse({
  verseId,
  verseName,
  songName,
  creators,
  lyrics,
  audios,
  active,
}: VerseData & { active?: boolean }) {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number>(0);
  const lyricTsRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const pendingRef = useRef<number>(0);

  const rewindSong = useCallback(() => {
    if (audioRef.current)
      audioRef.current.currentTime = 0;

    clearTimeout(timerRef.current);
    setCurrentLyricIndex(0);

    timerRef.current = 0;
    lyricTsRef.current = 0;
    elapsedRef.current = 0;
    pendingRef.current = 0;

    lyricsRef.current?.scrollTo({ top: 0 });
    resumeSong();
  }, []);

  const pauseSong = useCallback(() => {
    audioRef.current?.pause();
    elapsedRef.current = Date.now() - lyricTsRef.current;
    
    clearTimeout(timerRef.current);
    setPlaying(false);
  }, []);

  const resumeSong = useCallback(async () => {
    await audioRef.current?.play().catch(() => {});
    setPlaying(true);

    if (lyricTsRef.current === 0)
      return;
    
    lyricTsRef.current = Date.now() - elapsedRef.current;
    pendingRef.current = lyrics[currentLyricIndex].wait - elapsedRef.current;
  }, []);

  const togglePlay = useCallback(() => {
    (playing
      ? pauseSong
      : resumeSong
    )();
  }, [playing]);

  useEffect(() => {
    setAudioReady(false);
    audioRef.current = new Audio(audios.original);
    audioRef.current.onended = () => rewindSong();
    audioRef.current.oncanplaythrough = () => setAudioReady(true);
    
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [rewindSong, audios.original]);

  useEffect(() => {
    setCurrentLyricIndex(0);
    lyricsRef.current?.scrollTo({ top: 0 });
    (active
      ? rewindSong
      : pauseSong
    )();
  }, [active]);

  useEffect(() => {
    if (!active || !playing || !audioReady) return;
    if (currentLyricIndex >= lyrics.length) return;

    const lyricData = lyrics[currentLyricIndex];
    const lyricId = `lyric-${verseId}-${currentLyricIndex}`;
    const lyricEl = document.getElementById(lyricId);
    
    lyricsRef.current?.scrollTo({
      behavior: "smooth",
      top:
        - lyricsRef.current.offsetTop
        + (lyricEl?.offsetTop || 0)
        - lyricsRef.current.getBoundingClientRect().height / 2,
    })

    lyricTsRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      pendingRef.current = 0;
      setCurrentLyricIndex(currentLyricIndex + 1);
    }, pendingRef.current || lyricData.wait);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [
    active,
    playing,
    audioReady,
    currentLyricIndex,
    lyrics,
    verseId,
  ]);

  return (
    <div className="verse" id={`sing-${verseId}`}>
      <div className="verse-container">
        <div className="verse-meta">
          <h2 className="verse-song-name">{songName}</h2>
          <h3 className="verse-name">{verseName}</h3>
          
          <div className="verse-creators">
            <span>By</span>
            {creators.map((creator, index) => (
              <span key={index} className="verse-creator">
                {creator.name}
                {index < creators.length - 1 ? "," : ""}
              </span>
            ))}
          </div>
        </div>

        <div className="verse-lyrics" ref={lyricsRef}>
          {lyrics.map((lyric, index) => (
            <p
              key={index}
              className={[
                "verse-lyric",
                index < currentLyricIndex && active
                  ? "done"
                  : "",
                index === currentLyricIndex && active
                  ? "active"
                  : "",
              ].join(" ")}
              id={`lyric-${verseId}-${index}`}
            >
              {lyric.lyric}
            </p>
          ))}
        </div>

        <div className="verse-controls">
          {!audioReady && <button
            className="verse-control-loader"
          >
            <LoaderCircle className="spin" />
          </button>}

          {audioReady && <>
            <button
              className="verse-control-button"
              onClick={rewindSong}
            >
              <Rewind />
            </button>

            <button
              className="verse-control-button"
              onClick={togglePlay}
            >
              {
                playing
                  ? <Pause />
                  : <Play />
              }
            </button>
          </>}
        </div>
      </div>
    </div>
  );
}

