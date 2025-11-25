import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils"

const govButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-normal transition-all disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-2",
  {
    variants: {
      variant: {
        primary: "bg-gov-blue-500 hover:bg-gov-blue-600 hover:shadow-md text-black shadow-sm border-gov-blue-600 hover:border-gov-blue-700 focus-visible:ring-gov-blue-500",
        secondary: "bg-white hover:bg-gov-gray-50 hover:shadow-md text-gov-blue-500 border-gov-blue-500 hover:border-gov-blue-600 shadow-sm focus-visible:ring-gov-blue-500",
        success: "bg-gov-green-500 hover:bg-gov-green-600 hover:shadow-md text-black shadow-sm border-gov-green-600 hover:border-gov-green-700 focus-visible:ring-gov-green-500",
        danger: "bg-gov-red-500 hover:bg-red-600 hover:shadow-md text-black shadow-sm border-red-600 hover:border-red-700 focus-visible:ring-gov-red-500",
        ghost: "hover:bg-gov-gray-100 hover:shadow-sm text-gov-gray-700 border-transparent hover:border-gov-gray-300 focus-visible:ring-gov-gray-400",
        outline: "border-gov-gray-300 hover:bg-gov-gray-50 hover:border-gov-gray-400 hover:shadow-sm text-gov-gray-700 focus-visible:ring-gov-gray-400",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface GovButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof govButtonVariants> {
  asChild?: boolean
}

export function GovButton({ 
  className, 
  variant, 
  size, 
  asChild = false,
  ...props 
}: GovButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(govButtonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { govButtonVariants }
