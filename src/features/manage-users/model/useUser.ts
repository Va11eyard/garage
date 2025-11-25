'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type UserDto } from '@/shared/api/generated/__swagger_client'

export function useUser(id?: string) {
    return useQuery<UserDto, Error>({
        queryKey: ['users', id],
        queryFn: () => Service.get18(id!),
        enabled: !!id,
    })
}
