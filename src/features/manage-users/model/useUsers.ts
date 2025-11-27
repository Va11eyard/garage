'use client'

import { useQuery } from '@tanstack/react-query'
import { type PageUserDto, type UserDto } from '@/shared/api/generated/__swagger_client'
import { UserService } from './service'

const service = new UserService()

export function useUsers(params: {
    username?: string
    roles?: string[]
    page?: number
    size?: number
}) {
    return useQuery<PageUserDto, Error>({
        queryKey: ['users', params],
        queryFn: () => service.search(params.username, params.roles, params.page, params.size),
    })
}

export function useUsersList() {
    return useQuery<UserDto[], Error>({
        queryKey: ['users', 'list'],
        queryFn: () => service.list(),
    })
}
