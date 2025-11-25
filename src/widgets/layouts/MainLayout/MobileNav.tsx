'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { useTranslation } from '@/shared/i18n/use-translation'
import {Route} from "next";

export function MobileNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const { t } = useTranslation()

    const items = [
        { label: t('nav.dashboard'), href: '/dashboard' },
        { label: t('organizations.title'), href: '/directories/organizations' },
        { label: t('warehouses.title'), href: '/directories/warehouses' },
        { label: t('warehouseZones.title'), href: '/directories/warehouse-zones' },
        { label: t('warehouseCells.title'), href: '/directories/warehouse-cells' },
    ]

    return (
        <div className="md:hidden border-b border-gov-border">
            <div className="flex items-center justify-between px-4 py-2">
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="p-2 rounded hover:bg-gov-surface"
                >
                    <Menu className="w-6 h-6 text-gov-dark" />
                </button>
            </div>
            {open && (
                <nav className="px-4 pb-3 space-y-1 bg-white border-t border-gov-border">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href as Route}
                            className={cn(
                                'block px-3 py-2 rounded hover:bg-gov-surface',
                                pathname === item.href && 'bg-gov-secondary text-gov-primary font-semibold'
                            )}
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            )}
        </div>
    )
}
