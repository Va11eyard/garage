'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type UserDto } from '@/shared/api/generated/__swagger_client'

export function useCurrentUser() {
    return useQuery<UserDto, Error>({
        queryKey: ['currentUser'],
        queryFn: () => Service.me(),
        retry: false,
    })
}
