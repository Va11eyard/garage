'use client'

import { use } from 'react'
import { SurplusDetails } from '@/widgets/details/SurplusDetails'

export default function SurplusDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <SurplusDetails id={id} />
}
