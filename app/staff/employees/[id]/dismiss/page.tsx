import { EmployeeDismissForm } from '@/widgets/forms/EmployeeForms/EmployeeDismissForm'

export default function EmployeeDismissPage({ params }: { params: { id: string } }) {
    return <EmployeeDismissForm id={params.id} />
}
