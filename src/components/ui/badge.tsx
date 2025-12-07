import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center border px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200 overflow-hidden uppercase tracking-wider rounded-full",
  {
    variants: {
      variant: {
        default:
          "border-[#0F172A] bg-[#0F172A] text-white hover:bg-[#1E293B]",
        secondary:
          "border-[#F59E0B] bg-[#F59E0B] text-white hover:bg-[#D97706]",
        destructive:
          "border-[#DC2626] bg-[#DC2626] text-white hover:bg-[#B91C1C] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-[#0F172A] border-[#E2E8F0] bg-white hover:bg-[#F1F5F9]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
