'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type OrgUnitDto } from '@/shared/api/generated/__swagger_client'

export function useOrgUnit(id: string) {
    return useQuery<OrgUnitDto, Error>({
        queryKey: ['orgUnit', id],
        queryFn: () => Service.get4(id),
        enabled: !!id,
    })
}
