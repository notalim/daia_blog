import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-md border border-mid-purple focus:ring-2 focus:ring-mid-purple focus:outline-none p-2 text-sm bg-lavender-purple text-full-purple placeholder-mid-purple placeholder-opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
