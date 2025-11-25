import { IssueEditForm } from '@/widgets/forms/DocumentForms/IssueEditForm'

export default function IssueEditPage({ params }: { params: { id: string } }) {
    return <IssueEditForm id={params.id} />
}
