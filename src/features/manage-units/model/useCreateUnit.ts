import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import type { UnitOfMeasureCreateRequest } from '@/shared/api/generated/__swagger_client'

export function useCreateUnit() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: UnitOfMeasureCreateRequest) => Service.create4(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['units'] })
        },
    })
}
