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
                <div className="text-center py-12">
                    {(() => {
                        const errorMessage = (error as any)?.body?.message || (error as any)?.message || ''
                        const isProvisionNormError = errorMessage.includes('Не найдена подходящая норма обеспечения')
                        
                        if (isProvisionNormError) {
                            return (
                                <div className="max-w-2xl mx-auto">
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                        <div className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                                                    {t('reports.provisionNormNotFound')}
                                                </h3>
                                                <p className="text-yellow-800 mb-4">
                                                    {t('reports.provisionNormNotFoundDetails')}
                                                </p>
                                                <div className="text-sm text-yellow-700 bg-yellow-100 rounded p-3">
                                                    <p className="font-medium mb-1">{t('common.error')}:</p>
                                                    <p className="font-mono text-xs">{errorMessage}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        
                        return (
                            <div className="text-red-500">
                                <p>{t('common.error')}: {errorMessage || t('reports.noDataForEmployee')}</p>
                            </div>
                        )
                    })()}
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
