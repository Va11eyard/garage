'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ItemSupplyNormDto } from '@/shared/api/generated/__swagger_client'

export function useNorm(id: string) {
    return useQuery<ItemSupplyNormDto, Error>({
        queryKey: ['norms', id],
        queryFn: () => Service.get8(id),
        enabled: !!id,
    })
}
