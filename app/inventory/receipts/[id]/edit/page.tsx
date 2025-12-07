'use client'

import { use } from 'react'
import { ReceiptEditForm } from '@/widgets/forms/ReceiptForms/ReceiptEditForm'

export default function ReceiptEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ReceiptEditForm id={id} />
}
