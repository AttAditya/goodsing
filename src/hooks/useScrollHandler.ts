import { Dispatch, SetStateAction, UIEventHandler } from "react";

export function useScrollHandler(
  setIndex: Dispatch<SetStateAction<number>>
) {
  const scrollHandler: UIEventHandler<HTMLDivElement> = (event) => {
    setIndex(() => Math.floor(
      (event.currentTarget?.scrollTop || 0) / window.innerHeight
    ));
  }

  return { scrollHandler };
}

