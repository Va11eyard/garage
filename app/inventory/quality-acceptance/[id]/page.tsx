'use client'

import { use } from 'react'
import { QualityAcceptanceDetails } from '@/widgets/details/QualityAcceptanceDetails'

export default function QualityAcceptanceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <QualityAcceptanceDetails id={id} />
}
