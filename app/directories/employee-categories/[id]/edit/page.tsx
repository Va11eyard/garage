'use client'

import { use } from 'react'
import { EmployeeCategoryEditForm } from '@/widgets/forms/EmployeeCategoryForms/EmployeeCategoryEditForm'

export default function EmployeeCategoryEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <EmployeeCategoryEditForm id={id} />
}
