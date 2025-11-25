import * as React from "react"
import { cn } from "@/shared/lib/utils"

export interface GovCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GovCard({ className, ...props }: GovCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gov-gray-200 overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

export interface GovCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean
}

export function GovCardHeader({ className, gradient = true, ...props }: GovCardHeaderProps) {
  return (
    <div
      className={cn(
        "px-6 py-4",
        gradient && "bg-gradient-to-r from-gov-blue-500 to-gov-blue-700 text-white",
        !gradient && "border-b border-gov-gray-200",
        className
      )}
      {...props}
    />
  )
}

export interface GovCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function GovCardTitle({ className, ...props }: GovCardTitleProps) {
  return (
    <h3
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

export interface GovCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function GovCardDescription({ className, ...props }: GovCardDescriptionProps) {
  return (
    <p
      className={cn("text-sm opacity-90 mt-1", className)}
      {...props}
    />
  )
}

export interface GovCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GovCardContent({ className, ...props }: GovCardContentProps) {
  return (
    <div
      className={cn("p-6", className)}
      {...props}
    />
  )
}

export interface GovCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GovCardFooter({ className, ...props }: GovCardFooterProps) {
  return (
    <div
      className={cn(
        "px-6 py-4 bg-gov-gray-50 border-t border-gov-gray-200",
        className
      )}
      {...props}
    />
  )
}
