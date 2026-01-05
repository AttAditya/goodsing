import { FC, SVGProps } from "react";
import * as Lucide from "lucide-react";

export function Icon({
  icon,
  animations,
  filled,
}: {
  icon: keyof typeof Lucide;
  animations?: string[];
  filled?: boolean;
}) {
  const IconComponent = Lucide[icon] as FC<SVGProps<SVGSVGElement>>;

  return (
    <span className={[
      "icon",
      filled ? "icon-filled" : "",
      ...(animations || []),
    ].join(" ")}>
      <IconComponent />
    </span>
  );
}

