import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils"

const govBadgeVariants = cva(
  "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
  {
    variants: {
      variant: {
        active: "bg-gov-green-50 text-gov-green-800 border-gov-green-200",
        inactive: "bg-gov-gray-100 text-gov-gray-800 border-gov-gray-200",
        draft: "bg-gov-orange-50 text-orange-800 border-orange-200",
        posted: "bg-gov-green-50 text-gov-green-800 border-gov-green-200",
        cancelled: "bg-gov-red-50 text-red-800 border-red-200",
        pending: "bg-blue-50 text-blue-800 border-blue-200",
        success: "bg-gov-green-50 text-gov-green-800 border-gov-green-200",
        warning: "bg-gov-orange-50 text-orange-800 border-orange-200",
        error: "bg-gov-red-50 text-red-800 border-red-200",
        info: "bg-blue-50 text-blue-800 border-blue-200",
      },
    },
    defaultVariants: {
      variant: "active",
    },
  }
)

export interface GovBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof govBadgeVariants> {}

export function GovBadge({ className, variant, ...props }: GovBadgeProps) {
  return (
    <span
      className={cn(govBadgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { govBadgeVariants }
