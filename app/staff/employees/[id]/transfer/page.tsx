import { EmployeeTransferForm } from '@/widgets/forms/EmployeeForms/EmployeeTransferForm'

export default function EmployeeTransferPage({ params }: { params: { id: string } }) {
    return <EmployeeTransferForm id={params.id} />
}
