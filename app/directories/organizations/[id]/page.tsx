import { OrganizationDetails } from '@/widgets/details/OrganizationDetails'

export default function OrganizationDetailsPage({ params }: { params: { id: string } }) {
    return <OrganizationDetails id={params.id} />
}
