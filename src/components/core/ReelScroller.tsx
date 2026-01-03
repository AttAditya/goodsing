import { Dispatch, ReactNode, SetStateAction } from "react";
import { useScrollHandler } from "@hooks/useScrollHandler";

export function ReelScroller({
  setIndex,
  className,
  children,
}: {
  setIndex: Dispatch<SetStateAction<number>>;
  className?: string;
  children: ReactNode;
}) {
  const { scrollHandler } = useScrollHandler(setIndex);

  return (
    <div
      className={className}
      onScrollEndCapture={scrollHandler}
    >
      {children}
    </div>
  );
}

