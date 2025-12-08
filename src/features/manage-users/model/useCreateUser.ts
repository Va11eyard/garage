'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type CreateUserRequest, type UserDto } from '@/shared/api/generated/__swagger_client'
import { UserService } from './service'

const service = new UserService()

export function useCreateUser() {
    const queryClient = useQueryClient()

    return useMutation<UserDto, Error, CreateUserRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'], exact: false })
        },
    })
}
