'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useEmployeeCategory } from '@/features/manage-employee-categories/model/useEmployeeCategory'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'

export default function EmployeeCategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: category, isLoading } = useEmployeeCategory(id)

  if (isLoading) return <Spinner />
  if (!category) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('employeeCategories.title'), href: '/directories/employee-categories' },
        { label: category.code || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/directories/employee-categories')}>
            {t('common.back')}
          </GovButton>
          <GovButton onClick={() => router.push(`/directories/employee-categories/${id}/edit`)}>
            {t('common.edit')}
          </GovButton>
        </div>
      </div>

      <GovCard>
        <GovCardHeader>
          <GovCardTitle>{t('common.details')}</GovCardTitle>
        </GovCardHeader>
        <GovCardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">{t('employeeCategories.code')}</p>
              <p className="font-medium">{category.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('employeeCategories.name')}</p>
              <p className="font-medium">{category.name}</p>
            </div>
            {category.description && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">{t('employeeCategories.description')}</p>
                <p className="font-medium">{category.description}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">{t('common.status')}</p>
              <p className="font-medium">
                <span className={category.active ? 'text-green-600' : 'text-red-600'}>
                  {category.active ? t('common.active') : t('common.inactive')}
                </span>
              </p>
            </div>
          </div>
        </GovCardContent>
      </GovCard>
    </div>
  )
}
