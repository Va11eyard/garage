'use client'

import { useReturn } from '@/features/manage-returns/model/useReturn'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

export function ReturnDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: returnDoc, isLoading } = useReturn(id)

    if (isLoading) return <div className="gov-page-content">{t('common.loading')}</div>
    if (!returnDoc) return <div className="gov-page-content">{t('common.noData')}</div>

    return (
        <div className="gov-page-content space-y-6">
            <div className="gov-page-header flex justify-between items-center">
                <div>
                    <h1 className="gov-title">Документ возврата #{returnDoc.documentNumber}</h1>
                    <span className={`gov-badge gov-badge-${returnDoc.status?.toLowerCase()}`}>
                        {returnDoc.status}
                    </span>
                </div>
                {returnDoc.status === 'DRAFT' && (
                    <Link href={`/inventory/return/${id}/edit`}>
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
                            <p className="text-gov-gray-dark">{returnDoc.documentNumber}</p>
                        </div>
                        <div>
                            <span className="gov-form-label">{t('documents.documentDate')}</span>
                            <p className="text-gov-gray-dark">{new Date(returnDoc.documentDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {returnDoc.lines && returnDoc.lines.length > 0 && (
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
                                    <th>Сотрудник</th>
                                </tr>
                            </thead>
                            <tbody>
                                {returnDoc.lines.map((line: any, idx: number) => (
                                    <tr key={idx}>
                                        <td>{line.itemId}</td>
                                        <td>{line.quantity}</td>
                                        <td>{line.employeeId || '-'}</td>
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
