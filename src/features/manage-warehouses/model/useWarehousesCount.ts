'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useWarehousesCount() {
    return useQuery({
        queryKey: ['warehouses', 'count'],
        queryFn: async () => {
            const page = await Service.search(undefined, undefined, undefined, 0, 1);
            return page.totalElements;
        },
    })
}
