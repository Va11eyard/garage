'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ItemGroupDto } from '@/shared/api/generated/__swagger_client'

export function useItemGroups() {
    return useQuery<ItemGroupDto[], Error>({
        queryKey: ['item-groups'],
        queryFn: () => Service.listAll(),
    })
}
