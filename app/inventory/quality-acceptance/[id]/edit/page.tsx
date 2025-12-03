'use client'

import { use } from 'react'
import { QualityAcceptanceEditForm } from '@/widgets/forms/DocumentForms/QualityAcceptanceEditForm'

export default function QualityAcceptanceEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <QualityAcceptanceEditForm id={id} />
}
