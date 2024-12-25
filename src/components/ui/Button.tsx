import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      isLoading,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-black text-white hover:bg-gray-800": variant === "default",
            "border border-gray-200 hover:bg-gray-100": variant === "outline",
            "hover:bg-gray-100": variant === "ghost",
            "h-9 px-4 py-2": size === "default",
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-8": size === "lg",
            "bg-gray-300 text-gray-500": disabled,
          },
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        onClick={disabled || isLoading ? () => {} : onClick}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
