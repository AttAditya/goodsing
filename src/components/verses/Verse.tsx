import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import {
  LoaderCircle,
  Pause,
  Play,
  Rewind,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { VerseData } from "@interfaces/index";

import { useAudio } from "@hooks/useAudio";
import { useLyricsSync } from "@hooks/useLyricsSync";
import { useScrollHelper } from "@hooks/useScrollHelper";

import { ScrollableBlock } from "@components/core/ScrollableBlock";
import { Block } from "@components/core/Block";
import { Container } from "@components/core/Container";

export function Verse({
  verseId,
  verseName,
  songName,
  creators,
  lyrics,
  audios,
  active,
  scrollReady,
}: VerseData & {
  active?: boolean,
  scrollReady?: boolean,
}) {
  const parentRef = useRef(null);
  const parentTop = useRef<number>(0);
  const parentHeight = useRef<number>(0);
  const linesRef = useRef<{ [key: string]: RefObject<number> }>({});
  const [hyped, setHyped] = useState(false);

  const {
    currentLyricIndex,
    updateLyricIndex,
    lyricTimestamp,
  } = useLyricsSync(lyrics);

  const {
    audioReady, playing,
    reset, resume, pause,
    setFinishHandler,
    setTickHandler, setTime,
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
    <Container
      className={`verse ${scrollReady ? "scroll-ready" : ""}`}
      id={`sing-${verseId}`}
    >
      <Container className="verse-container">
        <Container className="verse-meta">
          <Container className="verse-meta-name">
            <Container className="verse-meta-name-content">
              <span className="verse-song-name">{songName}</span>
              <span className="verse-name">{} - {verseName}</span>
            </Container>
            <Container className="verse-meta-name-content">
              <span className="verse-song-name">{songName}</span>
              <span className="verse-name">{} - {verseName}</span>
            </Container>
          </Container>
          
          <Container className="verse-creators">
            <span>By</span>
            {creators.map((creator, index) => (
              <span key={index} className="verse-creator">
                {creator.name}
                {index < creators.length - 1 ? "," : ""}
              </span>
            ))}
          </Container>
        </Container>

        <Container className="verse-contents">
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
                  onClick={() => setTime(lyricTimestamp(index))}
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
        </Container>

        <Container className="verse-controls">
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

            <button
              className="verse-control-button"
              onClick={() => setHyped((hyped) => !hyped)}
            >
              {hyped ? <Sparkles /> : <WandSparkles />}
            </button>
          </>}
        </Container>
      </Container>
    </Container>
  );
}

