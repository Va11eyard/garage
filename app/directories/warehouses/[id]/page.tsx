'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { useWarehouse } from '@/features/manage-warehouses/model/useWarehouse'
import { useDeleteWarehouse } from '@/features/manage-warehouses/model/useDeleteWarehouse'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { useState } from 'react'
import { GovConfirmModal } from '@/gov-design/patterns'

export default function WarehouseDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: warehouse, isLoading } = useWarehouse(id)
    const deleteMutation = useDeleteWarehouse()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(id)
            toast.success('Склад удалён')
            router.push('/directories/warehouses')
        } catch (error) {
            toast.error('Ошибка при удалении склада')
        }
    }

    if (isLoading) return <Spinner />
    if (!warehouse) return <div>Склад не найден</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: 'НСИ', href: '/directories' },
                { label: 'Склады', href: '/directories/warehouses' },
                { label: warehouse.name || '' }
            ]} />

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gov-gray-900">{warehouse.name}</h1>
                <div className="flex gap-3">
                    <GovButton 
                        variant="primary"
                        onClick={() => router.push(`/directories/warehouses/${id}/edit`)}
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        {t('common.edit')}
                    </GovButton>
                    <GovButton 
                        variant="danger"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {t('common.delete')}
                    </GovButton>
                </div>
            </div>

            <GovCard>
                <GovCardHeader gradient={false}>
                    <GovCardTitle>Информация о складе</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <dt className="text-sm font-semibold text-gov-gray-600 mb-1">
                                {t('warehouses.code')}
                            </dt>
                            <dd className="text-base text-gov-gray-900">{warehouse.code}</dd>
                        </div>
                        
                        <div>
                            <dt className="text-sm font-semibold text-gov-gray-600 mb-1">
                                {t('warehouses.name')}
                            </dt>
                            <dd className="text-base text-gov-gray-900">{warehouse.name}</dd>
                        </div>

                        {warehouse.address && (
                            <div>
                                <dt className="text-sm font-semibold text-gov-gray-600 mb-1">
                                    {t('warehouses.address')}
                                </dt>
                                <dd className="text-base text-gov-gray-900">{warehouse.address}</dd>
                            </div>
                        )}

                        <div>
                            <dt className="text-sm font-semibold text-gov-gray-600 mb-1">
                                Статус
                            </dt>
                            <dd className="text-base">
                                <span className={warehouse.active ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                    {warehouse.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </dd>
                        </div>

                        {warehouse.description && (
                            <div className="md:col-span-2">
                                <dt className="text-sm font-semibold text-gov-gray-600 mb-1">
                                    {t('warehouses.description')}
                                </dt>
                                <dd className="text-base text-gov-gray-900">{warehouse.description}</dd>
                            </div>
                        )}
                    </dl>
                </GovCardContent>
            </GovCard>

            <GovConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title={t('warehouses.deleteConfirm')}
                message="Вы уверены, что хотите удалить этот склад? Это действие нельзя отменить."
                confirmText={t('common.delete')}
                cancelText={t('common.cancel')}
                variant="danger"
                isLoading={deleteMutation.isPending}
            />
        </div>
    )
}
