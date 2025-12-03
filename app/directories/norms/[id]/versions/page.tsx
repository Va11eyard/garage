'use client'

import { use } from 'react'
import { NormVersionsList } from '@/widgets/lists/NormVersionsList'

export default function NormVersionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <NormVersionsList normId={id} />
}
