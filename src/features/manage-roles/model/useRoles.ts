'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type RoleDto } from '@/shared/api/generated/__swagger_client'

export function useRoles() {
    return useQuery<RoleDto[], Error>({
        queryKey: ['roles'],
        queryFn: () => Service.list6(),
    })
}
