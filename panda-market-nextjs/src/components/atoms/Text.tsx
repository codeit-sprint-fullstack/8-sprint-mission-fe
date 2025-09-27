import { TextStyleName, textStyles } from "@/lib/text-styles";
import { cn } from "@/lib/utils";
import React, { ElementType } from "react";

interface TextProps {
  as?: ElementType;
  styleName: TextStyleName;
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  as: Component = "div",
  styleName,
  color = "text-secondary-800",
  children,
  className,
}: TextProps) {
  return (
    <Component className={cn(textStyles[styleName], color, className)}>
      {children}
    </Component>
  );
}
