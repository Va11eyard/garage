'use client'

import { useState } from 'react'
import { useProvisionAnalysis } from '@/features/manage-reports/model/useProvisionAnalysis'
import { useEmployees } from '@/features/manage-employees/model/useEmployees'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Spinner } from '@/shared/ui/spinner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'

export function ProvisionAnalysisTable() {
    const { t } = useTranslation()
    const [organizationId, setOrganizationId] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [season, setSeason] = useState<'ALL' | 'SUMMER' | 'WINTER' | 'DEMISEASON'>('ALL')
    
    const { data: organizations } = useOrganizations({})
    const { data: employeesData } = useEmployees({ 
        organizationId: organizationId || undefined,
        page: 0, 
        size: 1000 
    })
    const { data, isLoading, error } = useProvisionAnalysis({ 
        employeeId,
        season 
    })

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium mb-1">{t('reports.organization')}</label>
                    <Select
                        value={organizationId || undefined}
                        onValueChange={(value) => {
                            setOrganizationId(value)
                            setEmployeeId('')
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('organizations.selectOrganization')} />
                        </SelectTrigger>
                        <SelectContent>
                            {organizations?.content?.map((org: any) => (
                                <SelectItem key={org.id} value={org.id}>
                                    {org.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                <div className="min-w-[250px]">
                    <label className="block text-sm font-medium mb-1">{t('reports.employee')}</label>
                    <Select
                        value={employeeId || undefined}
                        onValueChange={setEmployeeId}
                        disabled={!organizationId}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('employees.selectEmployee')} />
                        </SelectTrigger>
                        <SelectContent>
                            {employeesData?.content?.map((emp: any) => (
                                <SelectItem key={emp.id} value={emp.id}>
                                    {emp.lastName} {emp.firstName} {emp.middleName || ''}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="min-w-[150px]">
                    <label className="block text-sm font-medium mb-1">{t('norm.season')}</label>
                    <Select value={season} onValueChange={(value: any) => setSeason(value)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">{t('norm.allSeasons')}</SelectItem>
                            <SelectItem value="SUMMER">{t('norm.summer')}</SelectItem>
                            <SelectItem value="WINTER">{t('norm.winter')}</SelectItem>
                            <SelectItem value="DEMISEASON">{t('norm.demiseason')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {isLoading && <Spinner />}

            {data && (
                <>
                    <GovCard>
                        <GovCardHeader>
                            <GovCardTitle>{t('employeeProvision.employee')}</GovCardTitle>
                        </GovCardHeader>
                        <GovCardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">{t('common.fullName')}</p>
                                    <p className="font-medium">
                                        {data.employeeLastName} {data.employeeFirstName} {data.employeeMiddleName || ''}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{t('organizations.organization')}</p>
                                    <p className="font-medium">{data.organizationName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{t('employeeProvision.category')}</p>
                                    <p className="font-medium">{data.employeeCategory}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{t('norm.season')}</p>
                                    <p className="font-medium">{data.season ? t(`norm.${data.season.toLowerCase()}`) : '-'}</p>
                                </div>
                            </div>
                        </GovCardContent>
                    </GovCard>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('items.code')}</TableHead>
                                <TableHead>{t('items.name')}</TableHead>
                                <TableHead>{t('employeeProvision.normQuantity')}</TableHead>
                                <TableHead>{t('employeeProvision.issuedQuantity')}</TableHead>
                                <TableHead>{t('employeeProvision.missingItems')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.items && data.items.length > 0 ? (
                                data.items.map((item: any, index: number) => (
                                    <TableRow key={item.itemId || index}>
                                        <TableCell>{item.itemCode}</TableCell>
                                        <TableCell>{item.itemName}</TableCell>
                                        <TableCell>{item.normQty}</TableCell>
                                        <TableCell>{item.issuedQty}</TableCell>
                                        <TableCell className={item.deficitQty > 0 ? 'text-red-600 font-medium' : ''}>
                                            {item.deficitQty}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500">
                                        {t('common.noData')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </>
            )}

            {error && employeeId && (
                <div className="text-center py-12 text-red-500">
                    <p>{t('common.error')}: {(error as any)?.body?.message || (error as any)?.message || t('reports.noDataForEmployee')}</p>
                </div>
            )}

            {!employeeId && !isLoading && (
                <div className="text-center py-12 text-gray-500">
                    <p>{t('reports.selectEmployeeToView')}</p>
                </div>
            )}
        </div>
    )
}
