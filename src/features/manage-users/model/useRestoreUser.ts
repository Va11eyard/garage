'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type UserDto } from '@/shared/api/generated/__swagger_client'
import { UserService } from './service'
const service = new UserService()
export function useRestoreUser() {
    const queryClient = useQueryClient()

    return useMutation<UserDto, Error, string>({
        mutationFn: (id: string) => service.restore(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}
