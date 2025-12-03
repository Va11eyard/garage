'use client'

import { use } from 'react'
import { ReturnDetails } from '@/widgets/details/ReturnDetails'

export default function ReturnDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ReturnDetails id={id} />
}
