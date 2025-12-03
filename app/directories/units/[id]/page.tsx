'use client'

import { use } from 'react'
import { UnitDetails } from '@/widgets/details/UnitDetails'

export default function UnitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <UnitDetails id={id} />
}
