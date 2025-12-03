'use client'

import { use } from 'react'
import { EmployeeDismissForm } from '@/widgets/forms/EmployeeForms/EmployeeDismissForm'

export default function DismissEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <EmployeeDismissForm id={id} />
}
