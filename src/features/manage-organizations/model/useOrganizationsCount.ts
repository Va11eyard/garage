'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useOrganizationsCount() {
    return useQuery({
        queryKey: ['organizations', 'count'],
        queryFn: async () => {
            const page = await Service.search4(undefined, undefined, 0, 1);
            return page.totalElements;
        },
    })
}
