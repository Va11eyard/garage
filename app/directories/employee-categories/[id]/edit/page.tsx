import { EmployeeCategoryEditForm } from '@/widgets/forms/EmployeeCategoryForms/EmployeeCategoryEditForm'

export default function EmployeeCategoryEditPage({ params }: { params: { id: string } }) {
    return <EmployeeCategoryEditForm id={params.id} />
}
