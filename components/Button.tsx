import React from "react";

import { cn } from "@/utils/helpers";

type ButtonProps = React.ComponentProps<"button"> & {
  isLoading?: boolean;
};

export default function Button({
  className,
  children,
  type,
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading}
      aria-disabled={isLoading}
      className={cn(
        "rounded-lg bg-font-color/10 px-6 py-2 font-semibold no-underline transition hover:bg-font-color/20 disabled:cursor-not-allowed disabled:bg-font-color/10",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
