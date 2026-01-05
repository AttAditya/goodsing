import { Icon } from "@components/core/Icon";
import { ComponentProps } from "react";

export function IconButton({
  onClick,
  passive,
  variant,
  size,
  ...iconProps
}: {
  onClick?: () => void;
  passive?: boolean;
  variant?: "secondary" | "";
  size?: "small";
} & ComponentProps<typeof Icon>) {
  return (
    <button className={[
      "icon-button",
      passive ? "passive" : "",
      variant ? variant : "",
      size ? size : "",
    ].join(" ")} onClick={onClick}>
      <Icon {...iconProps} />
    </button>
  );
}

