export function TextContent({
  classNames = [],
  children,
}: {
  classNames?: string[];
  children: string;
}) {
  const className = classNames.join(" ");
  return (
    <span className={className}>
      {children}
    </span>
  );
}

