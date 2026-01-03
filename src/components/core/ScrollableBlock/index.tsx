import { ComponentProps } from "react";
import { Block } from "@components/core/Block";

export function ScrollableBlock({
  ...props
}: ComponentProps<typeof Block>) {
  return <Block {...props} />
}

