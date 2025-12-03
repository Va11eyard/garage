import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

interface WearReportFilters {
    page?: number
    size?: number
    employeeName?: string
    organizationId?: string
    orgUnitId?: string
    itemId?: string
    from?: string
    to?: string
}

export function useWearReport(filters: WearReportFilters = {}) {
    const hasValidOrgId = !!(filters.organizationId && filters.organizationId.trim() !== '')
    
    return useQuery({
        queryKey: ['wear-report', filters],
        queryFn: () => {
            if (!hasValidOrgId) {
                return Promise.resolve({ content: [], totalElements: 0, totalPages: 0 })
            }
            return Service.searchEmployeeWearReportPage(
                filters.organizationId!,
                filters.orgUnitId || undefined,
                filters.itemId || undefined,
                filters.from,
                filters.to,
                filters.page,
                filters.size
            )
        },
        enabled: hasValidOrgId,
    })
}
