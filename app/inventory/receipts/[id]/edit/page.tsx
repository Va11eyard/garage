'use client'

import { use } from 'react'
import { ReceiptEditForm } from '@/widgets/forms/DocumentForms/ReceiptEditForm'

export default function ReceiptEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ReceiptEditForm id={id} />
}
