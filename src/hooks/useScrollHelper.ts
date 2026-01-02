export function useScrollHelper() {
  const scroll = (element: HTMLDivElement | null, top: number) => {
    if (!element) return;
    element.scrollTo({
      top,
      behavior: "smooth",
    });
  }

  return { scroll };
}

