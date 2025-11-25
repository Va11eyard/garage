import * as React from "react"
import { cn } from "@/shared/lib/utils"

export interface GovTableProps extends React.HTMLAttributes<HTMLTableElement> {}

export function GovTable({ className, ...props }: GovTableProps) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gov-gray-200">
      <table
        className={cn("w-full border-collapse", className)}
        {...props}
      />
    </div>
  )
}

export interface GovTableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function GovTableHeader({ className, ...props }: GovTableHeaderProps) {
  return (
    <thead
      className={cn(
        "bg-gradient-to-r from-gov-blue-500 to-gov-blue-700",
        className
      )}
      {...props}
    />
  )
}

export interface GovTableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function GovTableBody({ className, ...props }: GovTableBodyProps) {
  return (
    <tbody
      className={cn("bg-white", className)}
      {...props}
    />
  )
}

export interface GovTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export function GovTableRow({ className, ...props }: GovTableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-gov-gray-200 hover:bg-gov-blue-50 transition-colors",
        "even:bg-gov-gray-50",
        className
      )}
      {...props}
    />
  )
}

export interface GovTableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export function GovTableHead({ className, ...props }: GovTableHeadProps) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-sm font-normal text-black",
        "border-r border-white/10 last:border-r-0",
        className
      )}
      scope="col"
      {...props}
    />
  )
}

export interface GovTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export function GovTableCell({ className, ...props }: GovTableCellProps) {
  return (
    <td
      className={cn(
        "px-4 py-3 text-sm text-gov-gray-700",
        className
      )}
      {...props}
    />
  )
}
