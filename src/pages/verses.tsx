import { useState } from "react";

import { VerseData } from "@interfaces/index";
import { useScrollHandler } from "@hooks/useScrollHandler";
import { Verse } from "@components/verses/Verse";
import { VERSES } from "@registry/verses";

export function Verses() {
  const verses: VerseData[] = VERSES;
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const { scrollHandler } = useScrollHandler(setCurrentVerseIndex);

  return (
    <div className="verses" onScrollEndCapture={scrollHandler}>
      {verses.map((verse, index) => (
        <Verse
          key={verse.verseId}
          active={index === currentVerseIndex}
          {...verse}
        />
      ))}
    </div>
  );
}

