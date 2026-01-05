export function TextContent({
  className,
  children,
}: {
  className?: string;
  children: string;
}) {
  return (
    <span className={className}>
      {children}
    </span>
  );
}

