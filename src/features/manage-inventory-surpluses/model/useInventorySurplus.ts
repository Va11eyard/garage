'use client'

import { useQuery } from '@tanstack/react-query'
import { type InventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'
import { InventorySurplusService } from './service'

const service = new InventorySurplusService()

export function useInventorySurplus(id: string) {
    return useQuery<InventorySurplusDocumentDto, Error>({
        queryKey: ['inventory-surpluses', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
