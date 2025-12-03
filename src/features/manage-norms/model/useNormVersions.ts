'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ProvisionNormDto } from '@/shared/api/generated/__swagger_client'

export function useNormVersions(normId: string) {
    return useQuery<ProvisionNormDto, Error>({
        queryKey: ['norm', normId],
        queryFn: () => Service.getProvisionNormById(normId),
        enabled: !!normId,
    })
}
