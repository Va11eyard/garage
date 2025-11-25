import { EmployeeDetails } from '@/widgets/details/EmployeeDetails'

export default function EmployeeDetailsPage({ params }: { params: { id: string } }) {
    return <EmployeeDetails id={params.id} />
}
