import { ReactNode, RefObject, useLayoutEffect, useRef } from "react";

export function Block({
  leftRef,
  topRef,
  widthRef,
  heightRef,
  elementRef,
  classNames = [],
  onClick,
  children,
}: {
  leftRef?: RefObject<number>;
  topRef?: RefObject<number>;
  widthRef?: RefObject<number>;
  heightRef?: RefObject<number>;
  elementRef?: RefObject<HTMLDivElement | null>;
  classNames?: string[];
  onClick?: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const className = classNames.join(" ");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    leftRef && (leftRef.current = el.offsetLeft);
    topRef && (topRef.current = el.offsetTop);
    widthRef && (widthRef.current = el.offsetWidth);
    heightRef && (heightRef.current = el.offsetHeight);
    elementRef && (elementRef.current = el);
  });

  return (
    <div
      ref={ref}
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

