'use client'

import { use } from 'react'
import { UserDetails } from '@/widgets/details/UserDetails'

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <UserDetails id={id} />
}
