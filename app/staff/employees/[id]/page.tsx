'use client'

import { use } from 'react'
import { EmployeeDetails } from '@/widgets/details/EmployeeDetails'

export default function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <EmployeeDetails id={id} />
}
