'use client'

import { use } from 'react'
import { EmployeeTransferForm } from '@/widgets/forms/EmployeeForms/EmployeeTransferForm'

export default function TransferEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <EmployeeTransferForm id={id} />
}
