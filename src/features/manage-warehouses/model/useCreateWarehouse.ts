'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type WarehouseCreateRequest, type WarehouseDto } from '@/shared/api/generated/__swagger_client'

export function useCreateWarehouse() {
    const queryClient = useQueryClient()

    return useMutation<WarehouseDto, Error, WarehouseCreateRequest>({
        mutationFn: (data) => Service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouses'] })
        },
    })
}