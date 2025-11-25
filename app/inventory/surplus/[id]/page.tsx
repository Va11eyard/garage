import { InventorySurplusDetails } from '@/widgets/details/InventorySurplusDetails'

export default function InventorySurplusDetailsPage({ params }: { params: { id: string } }) {
    return <InventorySurplusDetails id={params.id} />
}
