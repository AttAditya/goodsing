import { ReactNode } from "react";

export function Container({
  classNames = [],
  children = null,
}: {
  classNames?: string[];
  children?: ReactNode;
}) {
  const className = classNames.join(" ");

  return (
    <div className={className}>
      {children}
    </div>
  );
}

