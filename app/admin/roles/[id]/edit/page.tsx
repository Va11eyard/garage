import { RoleEditForm } from '@/widgets/forms/RoleForms/RoleEditForm'

export default function RoleEditPage({ params }: { params: { id: string } }) {
    return <RoleEditForm code={params.id} />
}
