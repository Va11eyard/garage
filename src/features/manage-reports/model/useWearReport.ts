import { useQuery } from '@tanstack/react-query'
import { Service, type PageEmployeeWearReportRowDto } from '@/shared/api/generated/__swagger_client'

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
    
    return useQuery<PageEmployeeWearReportRowDto, Error>({
        queryKey: ['wear-report', filters],
        queryFn: async () => {
            if (!hasValidOrgId) {
                return { content: [], totalElements: 0, totalPages: 0 } as PageEmployeeWearReportRowDto
            }
            return Service.searchEmployeeWearReportPage(
                filters.organizationId!,
                filters.orgUnitId,
                filters.itemId,
                filters.from,
                filters.to,
                filters.page,
                filters.size
            )
        },
        enabled: hasValidOrgId,
    })
}
