'use client'

import { useQuery } from '@tanstack/react-query'
import { type ReplacementOrderDto } from '@/shared/api/generated/__swagger_client'
import { ReplacementOrderService } from './service'

const service = new ReplacementOrderService()

export function useReplacementOrder(id: string) {
    return useQuery<ReplacementOrderDto, Error>({
        queryKey: ['replacement-orders', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
