'use client'

import { use } from 'react'
import { MovementDetails } from '@/widgets/details/MovementDetails'

export default function MovementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <MovementDetails id={id} />
}
