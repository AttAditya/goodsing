import { ComponentProps } from "react";
import { Icon } from "@components/core/Icon";

export function IconButton({
  onClick,
  passive,
  variant = "primary",
  size = "normal",
  ...iconProps
}: {
  onClick?: () => void;
  passive?: boolean;
  variant?: "primary" | "secondary";
  size?: "small" | "normal";
} & ComponentProps<typeof Icon>) {
  const passiveStyle = passive ? "passive" : "active";

  return (
    <button className={[
      "icon-button",
      `icon-button-${passiveStyle}`,
      `icon-button-${variant}`,
      `icon-button-${size}`,
    ].join(" ")} onClick={onClick}>
      <Icon {...iconProps} />
    </button>
  );
}

