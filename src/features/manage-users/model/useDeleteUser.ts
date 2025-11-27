'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserService } from './service'

const service = new UserService()

export function useDeleteUser() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}
