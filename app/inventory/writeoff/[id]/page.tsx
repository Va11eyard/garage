'use client'

import { use } from 'react'
import { WriteOffDetails } from '@/widgets/details/WriteOffDetails'

export default function WriteOffDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <WriteOffDetails id={id} />
}
