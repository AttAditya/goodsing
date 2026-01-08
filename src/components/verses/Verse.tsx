import { RefObject, useCallback, useEffect, useRef, useState } from "react";

import { VerseData } from "@interfaces/verse";

import { useAudio } from "@hooks/useAudio";
import { useLyricsSync } from "@hooks/useLyricsSync";
import { useScrollHelper } from "@hooks/useScrollHelper";

import { ScrollableBlock } from "@components/core/ScrollableBlock";
import { Container } from "@components/core/Container";
import { TextContent } from "@components/core/TextContent";
import { Sweeper } from "@components/core/Sweeper";
import { IconButton } from "@components/core/IconButton";
import { LyricLine } from "@components/verses/LyricLine";
import { VerseOptions } from "@components/verses/VerseOptions";

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
  
  const [starred, setStarred] = useState(false);
  const [optionsActive, setOptionsActive] = useState(false);

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
    setSpeed,
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
          <Sweeper>
            <TextContent className="verse-song-name">
              {songName}
            </TextContent>
            <TextContent className="verse-name">
              {` - ${verseName}`}
            </TextContent>
          </Sweeper>
          
          <Container className="verse-creators">
            <TextContent>By</TextContent>
            {creators.map((creator, index) => (
              <TextContent key={index} className="verse-creator">
                {[
                  creator.name,
                  index < creators.length - 1 ? "," : "",
                ].join(" ")}
              </TextContent>
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
            {lyrics.map((lyric, index) => <LyricLine
              key={index}
              lyric={lyric}
              index={index}
              verseId={verseId}
              currentLyricIndex={currentLyricIndex}
              linesRef={linesRef}
              setTime={setTime}
              lyricTimestamp={lyricTimestamp}
              active={active}
            />)}
          </ScrollableBlock>
        </Container>

        <Container className="verse-controls">
          {!audioReady && <IconButton
            passive
            icon="LoaderCircle"
            animations={["spin"]}
          />}

          {audioReady && <>
            <IconButton
              onClick={() => setOptionsActive((active) => !active)}
              icon={"Wrench"}
              filled
            />

            <IconButton
              onClick={reset}
              icon="Rewind"
              filled
            />

            <IconButton
              onClick={togglePlay}
              icon={playing ? "Pause" : "Play"}
              filled
            />

            <IconButton
              onClick={() => setStarred((starred) => !starred)}
              icon={starred ? "Sparkles" : "Sparkle"}
              filled
            />
          </>}
        </Container>

        <VerseOptions
          active={optionsActive}
          updateSpeed={setSpeed}
        />
      </Container>
    </Container>
  );
}

