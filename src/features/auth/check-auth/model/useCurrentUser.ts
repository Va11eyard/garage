'use client'

import { useQuery } from '@tanstack/react-query'
import { type UserDto } from '@/shared/api/generated/__swagger_client'
import { OpenAPI } from '@/shared/api/generated/__swagger_client/core/OpenAPI'
import { request as __request } from '@/shared/api/generated/__swagger_client/core/request'

async function getCurrentUser(): Promise<UserDto> {
    return __request(OpenAPI, {
        method: 'GET',
        url: '/api/users/me',
    })
}

export function useCurrentUser() {
    return useQuery<UserDto, Error>({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        retry: false,
    })
}
