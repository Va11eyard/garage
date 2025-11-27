'use client'
import { UnitOfMeasureService } from './service'
const service = new UnitOfMeasureService()
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteUnit() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['units'] })
        },
    })
}
