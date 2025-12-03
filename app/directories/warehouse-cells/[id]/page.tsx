'use client'

import { use } from 'react'
import { WarehouseCellDetails } from '@/widgets/details/WarehouseCellDetails'

export default function WarehouseCellDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <WarehouseCellDetails id={id} />
}
