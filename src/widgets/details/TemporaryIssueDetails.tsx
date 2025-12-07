'use client'

import { useTemporaryIssue } from '@/features/manage-temporary-issues/model/useTemporaryIssue'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

export function TemporaryIssueDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: tempIssue, isLoading } = useTemporaryIssue(id)

    if (isLoading) return <div className="gov-page-content">{t('common.loading')}</div>
    if (!tempIssue) return <div className="gov-page-content">{t('common.noData')}</div>

    return (
        <div className="gov-page-content space-y-6">
            <div className="gov-page-header flex justify-between items-center">
                <div>
                    <h1 className="gov-title">Временная выдача #{tempIssue.docNumber}</h1>
                    <span className={`gov-badge gov-badge-${tempIssue.status?.toLowerCase()}`}>
                        {tempIssue.status}
                    </span>
                </div>
                {tempIssue.status === 'DRAFT' && (
                    <Link href={`/inventory/temporary-use/${id}/edit`}>
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
                            <p className="text-gov-gray-dark">{tempIssue.docNumber}</p>
                        </div>
                        <div>
                            <span className="gov-form-label">{t('documents.documentDate')}</span>
                            <p className="text-gov-gray-dark">{tempIssue.docDate ? new Date(tempIssue.docDate).toLocaleDateString() : '-'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {tempIssue.lines && tempIssue.lines.length > 0 && (
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
                                    <th>Срок возврата</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tempIssue.lines.map((line: any, idx: number) => (
                                    <tr key={idx}>
                                        <td>{line.itemId}</td>
                                        <td>{line.quantity}</td>
                                        <td>{line.employeeId || '-'}</td>
                                        <td>{line.returnDate ? new Date(line.returnDate).toLocaleDateString() : '-'}</td>
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
