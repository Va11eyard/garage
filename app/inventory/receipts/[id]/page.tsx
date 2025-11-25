import { ReceiptDetails } from '@/widgets/details/ReceiptDetails'

export default function ReceiptDetailsPage({ params }: { params: { id: string } }) {
    return <ReceiptDetails id={params.id} />
}
