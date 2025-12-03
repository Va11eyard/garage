'use client'

import { use } from 'react'
import { ItemDetails } from '@/widgets/details/ItemDetails'

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ItemDetails id={id} />
}
