import { NormEditForm } from '@/widgets/forms/NormForms/NormEditForm'

export default function NormEditPage({ params }: { params: { id: string } }) {
    return <NormEditForm id={params.id} />
}
