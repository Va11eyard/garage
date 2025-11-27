'use client'

import { useQuery } from '@tanstack/react-query'
import { type OrgUnitDto } from '@/shared/api/generated/__swagger_client'
import { OrgUnitService } from './service'

const service = new OrgUnitService()

export function useOrgUnit(id: string) {
    return useQuery<OrgUnitDto, Error>({
        queryKey: ['orgUnit', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
