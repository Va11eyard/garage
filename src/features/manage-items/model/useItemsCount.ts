'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useItemsCount() {
    return useQuery({
        queryKey: ['items', 'count'],
        queryFn: async () => {
            const page = await Service.search10(undefined, undefined, undefined, 0, 1);
            return page.totalElements;
        },
    })
}
