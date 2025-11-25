import { ItemDetails } from '@/widgets/details/ItemDetails'

export default function ItemDetailsPage({ params }: { params: { id: string } }) {
    return <ItemDetails id={params.id} />
}
