'use client'

import { use } from 'react'
import { OrgUnitDetails } from '@/widgets/details/OrgUnitDetails'

export default function OrgUnitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <OrgUnitDetails id={id} />
}
