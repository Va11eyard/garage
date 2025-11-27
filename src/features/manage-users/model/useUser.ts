'use client'

import { useQuery } from '@tanstack/react-query'
import { type UserDto } from '@/shared/api/generated/__swagger_client'
import { UserService } from './service'

const service = new UserService()

export function useUser(id?: string) {
    return useQuery<UserDto, Error>({
        queryKey: ['users', id],
        queryFn: () => service.get(id!),
        enabled: !!id,
    })
}
