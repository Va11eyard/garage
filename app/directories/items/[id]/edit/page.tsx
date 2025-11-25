import { ItemEditForm } from '@/widgets/forms/ItemForms/ItemEditForm'

export default function ItemEditPage({ params }: { params: { id: string } }) {
    return <ItemEditForm id={params.id} />
}
