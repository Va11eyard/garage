'use client'

import { use } from 'react'
import { UserEditForm } from '@/widgets/forms/UserForms/UserEditForm'

export default function UserEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <UserEditForm id={id} />
}
