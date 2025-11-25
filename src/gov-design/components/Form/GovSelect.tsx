import * as React from "react"
import { cn } from "@/shared/lib/utils"

export interface GovSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
  helperText?: string
}

export const GovSelect = React.forwardRef<HTMLSelectElement, GovSelectProps>(
  ({ className, error, helperText, children, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <select
          ref={ref}
          className={cn(
            "w-full px-3 py-2 border rounded-md text-sm bg-white",
            "focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-gov-red-500 focus:border-gov-red-500 focus:ring-gov-red-500/20"
              : "border-gov-gray-300 focus:border-gov-blue-500 focus:ring-gov-blue-500/20",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {helperText && (
          <p className={cn(
            "text-xs",
            error ? "text-gov-red-500" : "text-gov-gray-500"
          )}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

GovSelect.displayName = "GovSelect"
