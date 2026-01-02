import "./styles.css";

import { RefObject, useCallback, useEffect, useRef } from "react";
import { LoaderCircle, Pause, Play, Rewind } from "lucide-react";

import { VerseData } from "@interfaces/index";

import { useAudio } from "@hooks/useAudio";
import { useLyricsSync } from "@hooks/useLyricsSync";
import { useScrollHelper } from "@hooks/useScrollHelper";

import { ScrollableBlock } from "@components/ScrollableBlock";
import { Block } from "@components/Block";

export function Verse({
  verseId,
  verseName,
  songName,
  creators,
  lyrics,
  audios,
  active,
}: VerseData & { active?: boolean }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const parentTop = useRef<number>(0);
  const parentHeight = useRef<number>(0);
  const linesRef = useRef<{ [key: string]: RefObject<number> }>({});

  const {
    currentLyricIndex,
    updateLyricIndex,
  } = useLyricsSync(lyrics);

  const {
    audioReady, playing,
    reset, resume, pause,
    setFinishHandler,
    setTickHandler,
  } = useAudio(audios.original);

  const { scroll } = useScrollHelper();

  const togglePlay = useCallback(() => {
    (playing ? pause : resume)();
  }, [playing]);

  setFinishHandler(reset);
  setTickHandler(updateLyricIndex);
  
  useEffect(() => {
    (active ? reset : pause)()
  }, [active]);

  useEffect(() => {
    const lineKey = `lyric-${verseId}-${currentLyricIndex}`;
    const y = linesRef.current?.[lineKey]?.current || 0;
    const top = parentTop.current || 0;
    const height = parentHeight.current;
    const scrollTop = y - top - (height / 2);

    scroll(parentRef.current, scrollTop);
  }, [currentLyricIndex]);

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

        <ScrollableBlock
          className="verse-lyrics"
          topRef={parentTop}
          heightRef={parentHeight}
          elementRef={parentRef}
        >
          {lyrics.map((lyric, index) => {
            const key = `lyric-${verseId}-${index}`;
            if (!linesRef.current[key])
              linesRef.current[key] = { current: 0 };

            return (
              <Block
                key={index}
                topRef={linesRef.current[key]}
                className={[
                  "verse-lyric",
                  index < currentLyricIndex && active ? "done" : "",
                  index === currentLyricIndex && active ? "active" : "",
                ].join(" ")}
              >
                {lyric.lyric}
              </Block>
            )
          })}
        </ScrollableBlock>

        <div className="verse-controls">
          {!audioReady && <button
            className="verse-control-loader"
          >
            <LoaderCircle className="spin" />
          </button>}

          {audioReady && <>
            <button
              className="verse-control-button"
              onClick={reset}
            >
              <Rewind />
            </button>

            <button
              className="verse-control-button"
              onClick={togglePlay}
            >
              {playing ? <Pause /> : <Play />}
            </button>
          </>}
        </div>
      </div>
    </div>
  );
}

