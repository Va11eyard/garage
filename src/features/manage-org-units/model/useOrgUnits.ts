'use client'

import { useQuery } from '@tanstack/react-query'
import { type OrgUnitDto } from '@/shared/api/generated/__swagger_client'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useOrgUnits(params: {
    code?: string
    name?: string
    organizationId?: string
    organizationIds?: string[]
    page?: number
    size?: number
}) {
    return useQuery<OrgUnitDto[], Error>({
        queryKey: ['org-units', params],
        queryFn: async () => {
            let allUnits: OrgUnitDto[] = []

            if (params.organizationId) {
                allUnits = await service.listByOrganization(params.organizationId)
            }
            else if (params.organizationIds && params.organizationIds.length > 0) {
                const promises = params.organizationIds.map(orgId => 
                    service.listByOrganization(orgId).catch(() => [])
                )
                const results = await Promise.all(promises)
                allUnits = results.flat()
            }

            return allUnits.filter((unit: OrgUnitDto) => {
                const matchesCode = !params.code || unit.code?.toLowerCase().includes(params.code.toLowerCase())
                const matchesName = !params.name || unit.name?.toLowerCase().includes(params.name.toLowerCase())
                return matchesCode && matchesName
            })
        },
    })
}