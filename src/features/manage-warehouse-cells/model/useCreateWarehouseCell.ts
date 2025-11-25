import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import type { WarehouseCellCreateRequest } from '@/shared/api/generated/__swagger_client'

export function useCreateWarehouseCell() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: WarehouseCellCreateRequest) => Service.create3(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouse-cells'] })
        },
    })
}
