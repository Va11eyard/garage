'use client'

import { use } from 'react'
import { InventorySurplusEditForm } from '@/widgets/forms/DocumentForms/InventorySurplusEditForm'

export default function SurplusEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <InventorySurplusEditForm id={id} />
}
