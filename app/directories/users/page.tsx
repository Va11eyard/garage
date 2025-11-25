import { UsersTable } from '@/widgets/tables/UsersTable'
import { GovBreadcrumb } from '@/gov-design/patterns'

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: 'НСИ', href: '/directories' },
                { label: 'Пользователи' }
            ]} />
            <UsersTable />
        </div>
    )
}