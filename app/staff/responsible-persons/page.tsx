'use client'

import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function ResponsiblePersonsPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.staff'), href: '/staff' },
                { label: t('breadcrumbs.responsiblePersons') }
            ]} />
            
            <div>
                <h1 className="text-2xl font-bold text-gov-gray-900">Ответственные лица</h1>
                <p className="text-gov-gray-600 mt-2">Управление ответственными лицами организации</p>
            </div>

            <div className="bg-gov-blue-50 border border-gov-blue-200 rounded-lg p-6 text-center">
                <p className="text-gov-gray-700">Функционал в разработке</p>
            </div>
        </div>
    )
}
