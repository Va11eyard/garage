'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UnitOfMeasureService } from './service'

const service = new UnitOfMeasureService()

export function useDeleteUnit() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['units'] })
        },
    })
}
