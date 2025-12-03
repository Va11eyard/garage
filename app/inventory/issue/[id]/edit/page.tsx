'use client'

import { use } from 'react'
import { IssueEditForm } from '@/widgets/forms/DocumentForms/IssueEditForm'

export default function IssueEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <IssueEditForm id={id} />
}
