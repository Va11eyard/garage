'use client'

import { use } from 'react'
import { ResponsiblePersonDetails } from '@/widgets/details/ResponsiblePersonDetails'

export default function ResponsiblePersonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ResponsiblePersonDetails id={id} />
}
