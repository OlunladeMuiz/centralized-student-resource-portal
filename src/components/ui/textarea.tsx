import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-[4px_4px_0px_0px_rgba(6,182,212,1)] aria-invalid:border-destructive aria-invalid:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] dark:bg-input/30 flex field-sizing-content min-h-16 w-full border-4 bg-input-background px-4 py-3 text-base transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
