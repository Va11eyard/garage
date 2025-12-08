'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WriteOffService } from './service'

const service = new WriteOffService()

export function useDeleteWriteOff() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['write-offs'] })
            queryClient.invalidateQueries({ queryKey: ['writeOffs'] })
        },
    })
}
