'use client'

import { useQuery } from '@tanstack/react-query'
import { OrganizationService } from './service'

const service = new OrganizationService()

export function useOrganizationsCount() {
    return useQuery({
        queryKey: ['organizations', 'count'],
        queryFn: async () => {
            const page = await service.search({ page: 0, size: 1 });
            return page.totalElements;
        },
    })
}
