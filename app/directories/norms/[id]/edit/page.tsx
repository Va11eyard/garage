'use client'

import { use } from 'react'
import { NormEditForm } from '@/widgets/forms/NormForms/NormEditForm'

export default function EditNormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <NormEditForm id={id} />
}
