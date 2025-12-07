'use client'

import { useQualityAcceptance } from '@/features/manage-quality-acceptance/model/useQualityAcceptance'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

export function QualityAcceptanceDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: acceptance, isLoading } = useQualityAcceptance(id)

    if (isLoading) return <div className="gov-page-content">{t('common.loading')}</div>
    if (!acceptance) return <div className="gov-page-content">{t('common.noData')}</div>

    return (
        <div className="gov-page-content space-y-6">
            <div className="gov-page-header flex justify-between items-center">
                <div>
                    <h1 className="gov-title">Акт приёмки по качеству #{acceptance.docNumber}</h1>
                    <span className={`gov-badge gov-badge-${acceptance.status?.toLowerCase()}`}>
                        {acceptance.status}
                    </span>
                </div>
                {acceptance.status === 'DRAFT' && (
                    <Link href={`/inventory/quality-acceptance/${id}/edit`}>
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
                            <p className="text-gov-gray-dark">{acceptance.docNumber}</p>
                        </div>
                        <div>
                            <span className="gov-form-label">{t('documents.documentDate')}</span>
                            <p className="text-gov-gray-dark">{acceptance.docDate ? new Date(acceptance.docDate).toLocaleDateString() : '-'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {acceptance.lines && acceptance.lines.length > 0 && (
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
                                    <th>Категория качества</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acceptance.lines.map((line: any, idx: number) => (
                                    <tr key={idx}>
                                        <td>{line.itemId}</td>
                                        <td>{line.quantity}</td>
                                        <td>{line.qualityCategoryId || '-'}</td>
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
