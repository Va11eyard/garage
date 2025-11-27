import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import type { UnitOfMeasureCreateRequest } from '@/shared/api/generated/__swagger_client'
import { UnitOfMeasureService } from './service'
const service = new UnitOfMeasureService()

export function useCreateUnit() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: UnitOfMeasureCreateRequest) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['units'] })
        },
    })
}
