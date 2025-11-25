import { UnitDetails } from '@/widgets/details/UnitDetails'
export default function UnitDetailsPage({ params }: { params: { id: string } }) {
    return <UnitDetails id={params.id} />
}
