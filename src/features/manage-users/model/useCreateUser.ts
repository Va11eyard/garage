'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type CreateUserRequest, type UserDto } from '@/shared/api/generated/__swagger_client'

export function useCreateUser() {
    const queryClient = useQueryClient()

    return useMutation<UserDto, Error, CreateUserRequest>({
        mutationFn: (data) => Service.create18(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}
