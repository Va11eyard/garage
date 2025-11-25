'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ItemDto } from '@/shared/api/generated/__swagger_client'

export function useItem(id?: string) {
    return useQuery<ItemDto, Error>({
        queryKey: ['items', id],
        queryFn: () => Service.get7(id!),
        enabled: !!id,
    })
}
