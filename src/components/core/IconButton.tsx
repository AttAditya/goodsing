import { Icon } from "@components/core/Icon";
import { ComponentProps } from "react";

export function IconButton({
  onClick,
  passive,
  ...iconProps
}: {
  onClick?: () => void;
  passive?: boolean;
} & ComponentProps<typeof Icon>) {
  return (
    <button className={[
      "icon-button",
      passive ? "passive" : "",
    ].join(" ")} onClick={onClick}>
      <Icon {...iconProps} />
    </button>
  );
}

