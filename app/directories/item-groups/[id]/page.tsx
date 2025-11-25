import { ItemGroupDetails } from '@/widgets/details/ItemGroupDetails'

export default function ItemGroupDetailsPage({ params }: { params: { id: string } }) {
    return <ItemGroupDetails id={params.id} />
}
