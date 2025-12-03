'use client'

import { use } from 'react'
import { UnitEditForm } from '@/widgets/forms/UnitForms/UnitEditForm'

export default function UnitEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <UnitEditForm id={id} />
}
