'use client'

import { use } from 'react'
import { NormVersionDetails } from '@/widgets/details/NormVersionDetails'

export default function NormVersionDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string; versionId: string }> 
}) {
  const { id, versionId } = use(params)
  return <NormVersionDetails normId={id} versionId={versionId} />
}
