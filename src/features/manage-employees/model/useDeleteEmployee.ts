'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteEmployee() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => Service.delete17(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] })
        },
    })
}
