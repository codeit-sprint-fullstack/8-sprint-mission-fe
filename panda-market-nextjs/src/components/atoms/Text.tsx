import { TextStyleName, textStyles } from "@/lib/text-styles";
import { cn } from "@/lib/utils";
import React, { ElementType } from "react";

interface TextProps {
  as?: ElementType;
  styleName: TextStyleName;
  color?: string;
  content: string | number;
  className?: string;
}

export default function Text({
  as: Component = "div",
  styleName,
  color = "text-secondary-800",
  content,
  className,
}: TextProps) {
  return (
    <Component className={cn(textStyles[styleName], color, className)}>
      {content}
    </Component>
  );
}
