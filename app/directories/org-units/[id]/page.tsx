'use client'

import { use } from 'react'
import { OrgUnitDetails } from '@/widgets/details/OrgUnitDetails'

export default function OrgUnitDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    return <OrgUnitDetails id={id} />
}
