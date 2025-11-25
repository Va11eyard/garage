'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type InventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useInventorySurplus(id: string) {
    return useQuery<InventorySurplusDocumentDto, Error>({
        queryKey: ['inventory-surpluses', id],
        queryFn: () => Service.get20(id),
        enabled: !!id,
    })
}
