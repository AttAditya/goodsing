import { Dispatch, SetStateAction, UIEventHandler } from "react";

export function useScrollHandler(
  setIndex: Dispatch<SetStateAction<number>>
) {
  const scrollHandler: UIEventHandler<HTMLDivElement> = (event) => {
    const scrolled = event.currentTarget?.scrollTop || 0;
    const offsetY = event.currentTarget.getBoundingClientRect().top;
    const height = window.innerHeight - offsetY;
    setIndex(Math.floor(scrolled / height));
  }

  return { scrollHandler };
}

