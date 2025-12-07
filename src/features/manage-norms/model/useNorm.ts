'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ProvisionNormDto } from '@/shared/api/generated/__swagger_client'

export function useNorm(id: string) {
    return useQuery<ProvisionNormDto, Error>({
        queryKey: ['norms', id],
        queryFn: () => Service.getProvisionNormById(id),
        enabled: !!id,
    })
}
