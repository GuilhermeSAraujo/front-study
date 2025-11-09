import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

const textVariants = cva("text-base font-normal", {
  variants: {
    type: {
      h1: "text-5xl leading-[48px] font-bold tracking-tight",
      h2: "text-3xl font-semibold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
      h5: "text-lg leading-6 font-semibold",
      p: "leading-7",
      blockquote: "italic",
      code: "font-mono text-sm leading-5 font-bold px-1 py[3px] rounded-sm bg-slate-100",
      lead: "text-lg leading-7",
      large: "text-lg font-semibold leading-7",
      small: "text-sm leading-[14px] font-medium",
      subtle: "text-sm leading-5",
    },
  },
  defaultVariants: {
    type: "p",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

type TextTag =
  | Exclude<TextProps["type"], "large" | "lead" | "subtle" | null | undefined>
  | "strong"
  | "em";

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, type = "p", asChild = false, ...props }, ref) => {
    let tag = type as TextTag;
    if (type === "large") {
      tag = "strong";
    } else if (type === "lead") {
      tag = "em";
    } else if (type === "subtle") {
      tag = "p";
    }

    const Comp = asChild ? Slot : tag;
    return (
      <Comp
        className={cn(
          textVariants({ type, className }),
          className?.includes("leading") ? undefined : "leading-5"
        )}
        ref={ref as never}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };
