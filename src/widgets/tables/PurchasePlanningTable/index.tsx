'use client'

import { usePurchasePlans } from '@/features/manage-purchase-plans/model/usePurchasePlans'
import { useGeneratePurchasePlan } from '@/features/manage-purchase-plans/model/useGeneratePurchasePlan'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'
import { Badge } from '@/shared/ui/badge'
import { toast } from 'sonner'
import Link from 'next/link'
import { format } from 'date-fns'
import { Route } from 'next'

export function PurchasePlanningTable() {
    const { t } = useTranslation()
    const { data, isLoading } = usePurchasePlans()
    const generateMutation = useGeneratePurchasePlan()

    const handleGenerate = () => {
        generateMutation.mutate({}, {
            onSuccess: () => toast.success(t('planning.generated')),
            onError: () => toast.error(t('common.error')),
        })
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={handleGenerate} disabled={generateMutation.isPending}>
                    {generateMutation.isPending ? t('planning.generating') : t('planning.generate')}
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('planning.planNumber')}</TableHead>
                        <TableHead>{t('planning.planDate')}</TableHead>
                        <TableHead>{t('planning.status')}</TableHead>
                        <TableHead>{t('planning.totalItems')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((plan: any) => (
                        <TableRow key={plan.id}>
                            <TableCell>
                                <Link href={`/inventory/planning/${plan.id}` as Route} className="underline">
                                    {plan.planNumber}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {plan.planDate ? format(new Date(plan.planDate), 'dd.MM.yyyy') : '—'}
                            </TableCell>
                            <TableCell>
                                <Badge variant={plan.status === 'APPROVED' ? 'default' : 'secondary'}>
                                    {plan.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{plan.items?.length || 0}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/inventory/planning/${plan.id}` as Route}>{t('common.view')}</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
