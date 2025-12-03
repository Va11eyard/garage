'use client'

import { use } from 'react'
import { WarehouseDetails } from '@/widgets/details/WarehouseDetails'

export default function WarehouseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <WarehouseDetails id={id} />
}
