'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageUserDto, type UserDto } from '@/shared/api/generated/__swagger_client'

export function useUsers(params: {
    username?: string
    roles?: string[]
    page?: number
    size?: number
}) {
    return useQuery<PageUserDto, Error>({
        queryKey: ['users', params],
        queryFn: () => Service.search9(params.username, params.roles, params.page, params.size),
    })
}

export function useUsersList() {
    return useQuery<UserDto[], Error>({
        queryKey: ['users', 'list'],
        queryFn: () => Service.list5(),
    })
}
