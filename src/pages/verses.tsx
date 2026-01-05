import { useState } from "react";

import { VerseData } from "@interfaces/verse";
import { ReelScroller } from "@components/core/ReelScroller";
import { Verse } from "@components/verses/Verse";
import { VERSES } from "@registry/verses";

export function Verses() {
  const verses: VerseData[] = VERSES;
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

  return (
    <ReelScroller
      className="verses"
      setIndex={setCurrentVerseIndex}
    >
      {verses.map((verse, index) => (
        <Verse
          key={verse.verseId}
          active={index === currentVerseIndex}
          scrollReady={true ||
            currentVerseIndex === index ||
            currentVerseIndex === index - 1
          }
          {...verse}
        />
      ))}
    </ReelScroller>
  );
}

