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
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['warehouse-zones'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouse-zones'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['warehouseZones'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouseZones'], exact: false })
            router.refresh()
        },
    })
}
