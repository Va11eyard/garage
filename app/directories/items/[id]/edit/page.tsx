'use client'

import { use } from 'react'
import { ItemEditForm } from '@/widgets/forms/ItemForms/ItemEditForm'

export default function ItemEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ItemEditForm id={id} />
}
