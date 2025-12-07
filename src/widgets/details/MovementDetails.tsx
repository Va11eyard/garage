'use client'

import { useMovement } from '@/features/manage-movements/model/useMovement'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

export function MovementDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: movement, isLoading } = useMovement(id)

    if (isLoading) return <div className="gov-page-content">{t('common.loading')}</div>
    if (!movement) return <div className="gov-page-content">{t('common.noData')}</div>

    return (
        <div className="gov-page-content space-y-6">
            <div className="gov-page-header flex justify-between items-center">
                <div>
                    <h1 className="gov-title">Документ перемещения #{movement.docNumber}</h1>
                    <span className={`gov-badge gov-badge-${movement.status?.toLowerCase()}`}>
                        {movement.status}
                    </span>
                </div>
                {movement.status === 'DRAFT' && (
                    <Link href={`/inventory/movements/${id}/edit`}>
                        <Button className="gov-button-primary">{t('common.edit')}</Button>
                    </Link>
                )}
            </div>

            <div className="gov-card">
                <div className="gov-card-header">
                    <h2 className="gov-card-title">Информация о документе</h2>
                </div>
                <div className="gov-card-content space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="gov-form-label">{t('documents.documentNumber')}</span>
                            <p className="text-gov-gray-dark">{movement.docNumber}</p>
                        </div>
                        <div>
                            <span className="gov-form-label">{t('documents.documentDate')}</span>
                            <p className="text-gov-gray-dark">{movement.docDate ? new Date(movement.docDate).toLocaleDateString() : '-'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {movement.lines && movement.lines.length > 0 && (
                <div className="gov-card">
                    <div className="gov-card-header">
                        <h2 className="gov-card-title">Строки документа</h2>
                    </div>
                    <div className="gov-card-content">
                        <table className="gov-table">
                            <thead>
                                <tr>
                                    <th>Номенклатура</th>
                                    <th>Количество</th>
                                    <th>Откуда</th>
                                    <th>Куда</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movement.lines.map((line: any, idx: number) => (
                                    <tr key={idx}>
                                        <td>{line.itemId}</td>
                                        <td>{line.quantity}</td>
                                        <td>{line.fromWarehouseId || '-'}</td>
                                        <td>{line.toWarehouseId || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
