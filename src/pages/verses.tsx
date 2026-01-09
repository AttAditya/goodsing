import { useEffect, useState } from "react";

import { VerseData } from "@interfaces/verse";
import { ReelScroller } from "@components/core/ReelScroller";
import { Verse } from "@components/verses/Verse";
import { Container } from "@components/core/Container";
import { fetchVerses } from "@api/verse";

export function Verses() {
  const [ready, setReady] = useState(false);
  const [verses, setVerses] = useState<VerseData[]>([]);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

  useEffect(() => {
    const loadVerses = async () => {
      const verses = await fetchVerses();
      if (verses) setVerses(verses);
      setReady(true);
    };

    loadVerses();
  }, []);

  if (!ready) return (
    <Container className="verses">
      Loading...
    </Container>
  );

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

