'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type OrganizationDto } from '@/shared/api/generated/__swagger_client'

export function useOrganization(id: string) {
    return useQuery<OrganizationDto, Error>({
        queryKey: ['organization', id],
        queryFn: () => Service.get5(id),
        enabled: !!id,
    })
}
