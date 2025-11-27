'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type InventoryDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useInventory(id: string) {
    return useQuery<InventoryDocumentDto, Error>({
        queryKey: ['inventories', id],
        queryFn: () => Service.get22(id),
        enabled: !!id,
    })
}
