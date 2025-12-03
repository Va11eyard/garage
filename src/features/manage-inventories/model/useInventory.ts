'use client'

import { useQuery } from '@tanstack/react-query'
import { type InventoryDocumentDto, Service } from '@/shared/api/generated/__swagger_client'

export function useInventory(id: string) {
    return useQuery<InventoryDocumentDto, Error>({
        queryKey: ['inventories', id],
        queryFn: () => Service.getInventoryDocumentById(id),
        enabled: !!id,
    })
}
