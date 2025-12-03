'use client'

import { use } from 'react'
import { ItemGroupEditForm } from '@/widgets/forms/ItemGroupForms/ItemGroupEditForm'

export default function ItemGroupEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ItemGroupEditForm id={id} />
}
