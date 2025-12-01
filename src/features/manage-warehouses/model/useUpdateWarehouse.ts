'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type WarehouseUpdateRequest, type WarehouseDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseService } from './service'

const service = new WarehouseService()

export function useUpdateWarehouse() {
    const queryClient = useQueryClient()

    return useMutation<WarehouseDto, Error, { id: string; data: WarehouseUpdateRequest }>({
        mutationFn: ({ id, data }: any) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouses'] })
        },
    })
}
