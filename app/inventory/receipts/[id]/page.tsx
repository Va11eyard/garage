'use client'

import { use } from 'react'
import { ReceiptDetails } from '@/widgets/details/ReceiptDetails'

export default function ReceiptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ReceiptDetails id={id} />
}
