import { ReceiptEditForm } from '@/widgets/forms/ReceiptForms/ReceiptEditForm'

export default function ReceiptEditPage({ params }: { params: { id: string } }) {
    return <ReceiptEditForm id={params.id} />
}
