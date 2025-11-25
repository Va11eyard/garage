import { UserEditForm } from '@/widgets/forms/UserForms/UserEditForm'

export default function UserEditPage({ params }: { params: { id: string } }) {
    return <UserEditForm id={params.id} />
}
