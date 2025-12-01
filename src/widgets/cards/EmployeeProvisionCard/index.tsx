'use client'

import { useEmployeeProvisionCard } from '@/features/view-employee-provision/model/useEmployeeProvisionCard'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Badge } from '@/shared/ui/badge'
import { Spinner } from '@/shared/ui/spinner'
import { format } from 'date-fns'

interface EmployeeProvisionCardProps {
    employeeId: string
}

export function EmployeeProvisionCard({ employeeId }: EmployeeProvisionCardProps) {
    const { t } = useTranslation()
    const { data, isLoading } = useEmployeeProvisionCard(employeeId)

    if (isLoading) return <Spinner />
    if (!data) return null

    const getStatusBadge = (status: string) => {
        const variants = {
            OK: 'default',
            DUE: 'secondary',
            OVERDUE: 'destructive',
        } as const
        return variants[status as keyof typeof variants] || 'secondary'
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('employeeProvision.provisionCard')}</CardTitle>
                <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>{t('employeeProvision.employee')}:</strong> {data.employeeName}</p>
                    <p><strong>{t('employeeProvision.category')}:</strong> {data.categoryName}</p>
                    {data.normName && (
                        <p><strong>{t('employeeProvision.norm')}:</strong> {data.normName}</p>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('stockBalances.item')}</TableHead>
                            <TableHead>{t('employeeProvision.normQuantity')}</TableHead>
                            <TableHead>{t('employeeProvision.issuedQuantity')}</TableHead>
                            <TableHead>{t('employeeProvision.remainingQuantity')}</TableHead>
                            <TableHead>{t('employeeProvision.nextIssueDate')}</TableHead>
                            <TableHead>{t('common.status')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.items?.map((item: any) => (
                            <TableRow key={item.itemId}>
                                <TableCell>
                                    <div>
                                        <div className="font-medium">{item.itemName}</div>
                                        <div className="text-xs text-muted-foreground">{item.itemCode}</div>
                                    </div>
                                </TableCell>
                                <TableCell>{item.normQuantity}</TableCell>
                                <TableCell>{item.issuedQuantity}</TableCell>
                                <TableCell>{item.remainingQuantity}</TableCell>
                                <TableCell>
                                    {item.nextIssueDate
                                        ? format(new Date(item.nextIssueDate), 'dd.MM.yyyy')
                                        : '—'}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusBadge(item.status)}>
                                        {t(`employeeProvision.itemStatus.${item.status.toLowerCase()}`)}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
