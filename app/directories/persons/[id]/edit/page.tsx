'use client'

import { use } from 'react'
import { PersonEditForm } from '@/widgets/forms/PersonForms/PersonEditForm'

export default function PersonEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <PersonEditForm id={id} />
}
