import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import type { WarehouseZoneCreateRequest } from '@/shared/api/generated/__swagger_client'

export function useCreateWarehouseZone() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: WarehouseZoneCreateRequest) => Service.create2(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouse-zones'] })
        },
    })
}
