import { EmployeeCategoryDetails } from '@/widgets/details/EmployeeCategoryDetails'

export default function EmployeeCategoryDetailsPage({ params }: { params: { id: string } }) {
    return <EmployeeCategoryDetails id={params.id} />
}
