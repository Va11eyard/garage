'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type WarehouseCreateRequest, type WarehouseDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseService } from "./service";
const service = new WarehouseService();
export function useCreateWarehouse() {
    const queryClient = useQueryClient()

    return useMutation<WarehouseDto, Error, WarehouseCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouses'], exact: false })
        },
    })
}