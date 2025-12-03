'use client'

import { use } from 'react'
import { WriteOffEditForm } from '@/widgets/forms/DocumentForms/WriteOffEditForm'

export default function WriteOffEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <WriteOffEditForm id={id} />
}
