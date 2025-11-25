import { WarehouseCellDetails } from '@/widgets/details/WarehouseCellDetails'

export default function WarehouseCellDetailsPage({ params }: { params: { id: string } }) {
    return <WarehouseCellDetails id={params.id} />
}
