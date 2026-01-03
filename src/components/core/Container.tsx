import { ReactNode } from "react";

export function Container({
  className,
  id,
  children,
}: {
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
}

