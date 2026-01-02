import { UIEventHandler } from "react";

export function useScrollHandler(
  setCurrentVerseIndex: (index: number) => void
) {
  const scrollHandler: UIEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget.classList.contains("verse-lyrics")) {
      event.stopPropagation();
      return;
    }

    const scrollThreshold = 0.05;
    const previousScrolled = window.scrolledHeight || 0;
    const scrolledAmount = event.currentTarget.scrollTop;
    const windowHeight = window.innerHeight;
    const relativeScroll = scrolledAmount % windowHeight;
    const direction = previousScrolled < scrolledAmount ? "down" : "up";
    
    const scrollRatio = direction === "down"
      ? relativeScroll / windowHeight
      : 1 - (relativeScroll / windowHeight);
    
    window.scrolledHeight = scrolledAmount;
    event.currentTarget.scrollBy({
      behavior: "smooth",
      top: scrollRatio > scrollThreshold
        ? (
          direction === "down"
            ? windowHeight - relativeScroll
            : -relativeScroll
          )
        : (
          direction === "down"
            ? -relativeScroll
            : windowHeight - relativeScroll
        ),
    });

    if (scrollRatio === 0 || scrollRatio === 1) {
      const nextIndex = scrolledAmount / windowHeight;
      setCurrentVerseIndex(nextIndex);
    }
  }

  return { scrollHandler };
}

