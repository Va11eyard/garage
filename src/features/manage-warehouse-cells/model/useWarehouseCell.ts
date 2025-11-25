'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type WarehouseCellDto } from '@/shared/api/generated/__swagger_client'

export function useWarehouseCell(id: string) {
    return useQuery<WarehouseCellDto, Error>({
        queryKey: ['warehouseCell', id],
        queryFn: () => Service.get9(id),
        enabled: !!id,
    })
}
