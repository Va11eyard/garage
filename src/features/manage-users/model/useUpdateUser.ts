'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type UpdateUserRequest, type UserDto } from '@/shared/api/generated/__swagger_client'
import { UserService } from './service'

const service = new UserService()

export function useUpdateUser() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<UserDto, Error, { id: string; data: UpdateUserRequest }>({
        mutationFn: ({ id, data }: any) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'], exact: false })
            router.refresh()
        },
    })
}
