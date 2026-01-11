import { RefObject } from "react";
import { Block } from "@components/core/Block";

export function LyricLine({
  lyric,
  index,
  verseId,
  currentLyricIndex,
  linesRef,
  setTime,
  lyricTimestamp,
  active,
}: {
  lyric: { lyric: string; timestamp: number };
  index: number;
  verseId: string;
  currentLyricIndex: number;
  linesRef: RefObject<{ [key: string]: RefObject<number> }>;
  setTime: (time: number) => void;
  lyricTimestamp: (index: number) => number;
  active?: boolean;
}) {
  const key = `lyric-${verseId}-${index}`;
  if (!linesRef.current[key])
    linesRef.current[key] = { current: 0 };

  return (
    <Block
      key={index}
      topRef={linesRef.current[key]}
      onClick={() => setTime(lyricTimestamp(index))}
      classNames={[
        "lyric-line",
        index < currentLyricIndex && active ? "done" : "",
        index === currentLyricIndex && active ? "active" : "",
      ]}
    >
      {lyric.lyric}
    </Block>
  );
}

