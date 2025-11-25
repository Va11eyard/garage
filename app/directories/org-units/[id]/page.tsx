import { OrgUnitDetails } from '@/widgets/details/OrgUnitDetails'

export default function OrgUnitDetailsPage({ params }: { params: { id: string } }) {
    return <OrgUnitDetails id={params.id} />
}
