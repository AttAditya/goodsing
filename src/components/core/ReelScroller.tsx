import { Dispatch, ReactNode, SetStateAction } from "react";
import { useScrollHandler } from "@hooks/useScrollHandler";

export function ReelScroller({
  setIndex,
  classNames = [],
  children,
}: {
  setIndex: Dispatch<SetStateAction<number>>;
  classNames?: string[];
  children: ReactNode;
}) {
  const { scrollHandler } = useScrollHandler(setIndex);
  const className = classNames.join(" ");

  return (
    <div
      className={className}
      onScrollEndCapture={scrollHandler}
    >
      {children}
    </div>
  );
}

