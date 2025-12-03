'use client'

import { useQuery } from '@tanstack/react-query'
import { type OrgUnitDto } from '@/shared/api/generated/__swagger_client'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useOrgUnits(params: {
    code?: string
    name?: string
    organizationId?: string
    page?: number
    size?: number
}) {
    return useQuery<OrgUnitDto[], Error>({
        queryKey: ['org-units', params],
        queryFn: async () => {
            // No paginated search endpoint - use listByOrganization
            if (params.organizationId) {
                const data = await service.listByOrganization(params.organizationId)
                // Client-side filtering
                return data.filter((unit: OrgUnitDto) => {
                    const matchesCode = !params.code || unit.code?.toLowerCase().includes(params.code.toLowerCase())
                    const matchesName = !params.name || unit.name?.toLowerCase().includes(params.name.toLowerCase())
                    return matchesCode && matchesName
                })
            }
            return []
        },
        enabled: !!params.organizationId,
    })
}