'use client'

import { useIssue } from '@/features/manage-issues/model/useIssue'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

export function IssueDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: issue, isLoading } = useIssue(id)

    if (isLoading) return <div className="gov-page-content">{t('common.loading')}</div>
    if (!issue) return <div className="gov-page-content">{t('common.noData')}</div>

    return (
        <div className="gov-page-content space-y-6">
            <div className="gov-page-header flex justify-between items-center">
                <div>
                    <h1 className="gov-title">Документ выдачи #{issue.documentNumber}</h1>
                    <span className={`gov-badge gov-badge-${issue.status?.toLowerCase()}`}>
                        {issue.status}
                    </span>
                </div>
                {issue.status === 'DRAFT' && (
                    <Link href={`/inventory/issue/${id}/edit`}>
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
                            <p className="text-gov-gray-dark">{issue.documentNumber}</p>
                        </div>
                        <div>
                            <span className="gov-form-label">{t('documents.documentDate')}</span>
                            <p className="text-gov-gray-dark">{new Date(issue.documentDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {issue.lines && issue.lines.length > 0 && (
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
                                {issue.lines.map((line: any, idx: number) => (
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
