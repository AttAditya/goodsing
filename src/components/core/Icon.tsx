import { FC, SVGProps } from "react";
import * as Lucide from "lucide-react";

import { IconKey } from "@interfaces/icons";

export function Icon({
  icon,
  animations,
  filled,
}: {
  icon: IconKey;
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

