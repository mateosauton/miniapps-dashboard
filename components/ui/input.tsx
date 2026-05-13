import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-md border border-gray-200 bg-gray-0 px-2.5 py-1 text-[13px] text-gray-900 transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:border-gray-900 focus-visible:ring-2 focus-visible:ring-gray-900/10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60 aria-invalid:border-error-600 aria-invalid:ring-2 aria-invalid:ring-error-600/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
