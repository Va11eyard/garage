'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type CreateUserRequest, type UserDto } from '@/shared/api/generated/__swagger_client'
import { UserService } from './service'

const service = new UserService()

export function useCreateUser() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<UserDto, Error, CreateUserRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['users'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['users'], exact: false })
            router.refresh()
        },
    })
}
