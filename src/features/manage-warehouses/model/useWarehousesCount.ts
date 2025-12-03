'use client'

import { useQuery } from '@tanstack/react-query'
import { WarehouseService } from './service'

const service = new WarehouseService()

export function useWarehousesCount() {
    return useQuery({
        queryKey: ['warehouses', 'count'],
        queryFn: async () => {
            const page = await service.search(undefined, undefined, 0, 1);
            return page.totalElements;
        },
    })
}
