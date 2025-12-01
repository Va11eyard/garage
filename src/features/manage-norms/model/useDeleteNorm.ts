'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteNorm() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => Service.delete7(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['norms'] })
        },
    })
}
