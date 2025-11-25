'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ItemGroupDto } from '@/shared/api/generated/__swagger_client'

export function useItemGroup(id: string) {
    return useQuery<ItemGroupDto, Error>({
        queryKey: ['itemGroup', id],
        queryFn: () => Service.get8(id),
        enabled: !!id,
    })
}
