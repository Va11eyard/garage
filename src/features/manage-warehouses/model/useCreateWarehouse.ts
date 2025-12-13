'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type WarehouseCreateRequest, type WarehouseDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseService } from "./service";
const service = new WarehouseService();
export function useCreateWarehouse() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<WarehouseDto, Error, WarehouseCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['warehouses'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouses'], exact: false })
            router.refresh()
        },
    })
}