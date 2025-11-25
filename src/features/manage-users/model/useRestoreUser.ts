'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type UserDto } from '@/shared/api/generated/__swagger_client'

export function useRestoreUser() {
    const queryClient = useQueryClient()

    return useMutation<UserDto, Error, string>({
        mutationFn: (id) => Service.restore(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}
