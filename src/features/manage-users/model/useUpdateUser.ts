'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type UpdateUserRequest, type UserDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateUser() {
    const queryClient = useQueryClient()

    return useMutation<UserDto, Error, { id: string; data: UpdateUserRequest }>({
        mutationFn: ({ id, data }) => Service.update18(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}
