'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ReplacementOrderDto } from '@/shared/api/generated/__swagger_client'

export function useReplacementOrder(id: string) {
    return useQuery<ReplacementOrderDto, Error>({
        queryKey: ['replacement-orders', id],
        queryFn: () => Service.get15(id),
        enabled: !!id,
    })
}
