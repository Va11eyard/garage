'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteWriteOff() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id) => Service.delete12(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['write-offs'] })
        },
    })
}
