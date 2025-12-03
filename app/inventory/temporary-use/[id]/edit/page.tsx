'use client'

import { use } from 'react'
import { TemporaryUseEditForm } from '@/widgets/forms/DocumentForms/TemporaryUseEditForm'

export default function TemporaryUseEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <TemporaryUseEditForm id={id} />
}
