'use client'

import { use } from 'react'
import { TemporaryIssueDetails } from '@/widgets/details/TemporaryIssueDetails'

export default function TemporaryUseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <TemporaryIssueDetails id={id} />
}
