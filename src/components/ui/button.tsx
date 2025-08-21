import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",

        /** ▼ YENİ: görünür çerçeveli buton */
        framed:
          "border-2 shadow-md backdrop-blur-sm rounded-xl font-semibold focus-visible:ring-[4px]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },

      /** ▼ YENİ: framed için renk paleti */
      color: {
        indigo:
          "bg-indigo-600/80 border-indigo-300/80 hover:bg-indigo-600 text-white focus-visible:ring-indigo-400/40",
        emerald:
          "bg-emerald-600/80 border-emerald-300/80 hover:bg-emerald-600 text-white focus-visible:ring-emerald-400/40",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    compoundVariants: [
      // color yalnızca framed’da anlamlı olsun diye (diğer variantlarda etki etsin istemiyorsan bunu bırak)
      { variant: "framed", color: "indigo", className: "" },
      { variant: "framed", color: "emerald", className: "" },
    ],
  }
);

function Button({
  className,
  variant,
  size,
  color,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, color, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
