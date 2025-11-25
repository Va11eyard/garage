'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type WarehouseUpdateRequest, type WarehouseDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateWarehouse() {
    const queryClient = useQueryClient()

    return useMutation<WarehouseDto, Error, { id: string; data: WarehouseUpdateRequest }>({
        mutationFn: ({ id, data }) => Service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouses'] })
        },
    })
}
