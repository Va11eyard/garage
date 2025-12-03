'use client'

import { use } from 'react'
import { EmployeeCategoryDetails } from '@/widgets/details/EmployeeCategoryDetails'

export default function EmployeeCategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <EmployeeCategoryDetails id={id} />
}
