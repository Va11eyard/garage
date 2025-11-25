import * as React from "react"
import { cn } from "@/shared/lib/utils"

export interface GovLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function GovLabel({ className, required, children, ...props }: GovLabelProps) {
  return (
    <label
      className={cn(
        "block text-sm font-semibold text-gov-gray-700 mb-1",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-gov-red-500 ml-1">*</span>}
    </label>
  )
}
