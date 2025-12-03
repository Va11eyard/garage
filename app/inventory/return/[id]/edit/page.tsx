'use client'

import { use } from 'react'
import { ReturnEditForm } from '@/widgets/forms/DocumentForms/ReturnEditForm'

export default function ReturnEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ReturnEditForm id={id} />
}
