'use client'

import { use } from 'react'
import { MovementEditForm } from '@/widgets/forms/DocumentForms/MovementEditForm'

export default function MovementEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <MovementEditForm id={id} />
}
