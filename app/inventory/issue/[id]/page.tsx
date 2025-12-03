'use client'

import { use } from 'react'
import { IssueDetails } from '@/widgets/details/IssueDetails'

export default function IssueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <IssueDetails id={id} />
}
