'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type WarehouseUpdateRequest, type WarehouseDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseService } from './service'

const service = new WarehouseService()

export function useUpdateWarehouse() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<WarehouseDto, Error, { id: string; data: WarehouseUpdateRequest }>({
        mutationFn: ({ id, data }: any) => service.update(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['warehouses'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouses'], exact: false })
            router.refresh()
        },
    })
}
