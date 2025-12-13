'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { WarehouseZoneService } from './service'

const service = new WarehouseZoneService()

export function useDeleteWarehouseZone() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouse-zones'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['warehouseZones'], exact: false })
            router.refresh()
        },
    })
}
