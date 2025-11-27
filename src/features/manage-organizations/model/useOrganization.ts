'use client'

import { useQuery } from '@tanstack/react-query'
import { type OrganizationDto } from '@/shared/api/generated/__swagger_client'
import { OrganizationService } from './service'

const service = new OrganizationService()

export function useOrganization(id: string) {
    return useQuery<OrganizationDto, Error>({
        queryKey: ['organization', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
