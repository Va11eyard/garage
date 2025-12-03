'use client'

import { use } from 'react'
import { OrganizationDetails } from '@/widgets/details/OrganizationDetails'

export default function OrganizationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <OrganizationDetails id={id} />
}
