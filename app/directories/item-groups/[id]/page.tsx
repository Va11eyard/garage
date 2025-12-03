'use client'

import { use } from 'react'
import { ItemGroupDetails } from '@/widgets/details/ItemGroupDetails'

export default function ItemGroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ItemGroupDetails id={id} />
}
