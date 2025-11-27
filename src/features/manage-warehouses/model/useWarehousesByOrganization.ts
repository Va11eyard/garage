'use client'

import { useQuery } from '@tanstack/react-query'
import { WarehouseService } from './service'
import type { WarehouseDto } from '@/shared/api/generated/__swagger_client'

const service = new WarehouseService()

export function useWarehousesByOrganization(orgId?: string) {
    return useQuery<WarehouseDto[], Error>({
        queryKey: ['warehouses', 'by-organization', orgId],
        queryFn: () => service.listByOrganization(orgId!),
        enabled: !!orgId,
    })
}
