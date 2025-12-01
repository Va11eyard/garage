'use client'

import * as React from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { useTranslation } from "@/shared/i18n/use-translation"

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface GovBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function GovBreadcrumb({ items, className }: GovBreadcrumbProps) {
  const { t } = useTranslation()
  
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-sm mb-6", className)}
    >
      <Link
        href="/dashboard"
        className="text-gov-gray-600 hover:text-gov-blue-500 transition-colors"
        aria-label={t('nav.dashboard')}
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 text-gov-gray-400" />
            {item.href && !isLast ? (
              <Link
                href={item.href as any}
                className="text-gov-gray-600 hover:text-gov-blue-500 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  isLast
                    ? "text-gov-gray-900 font-medium"
                    : "text-gov-gray-600"
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
