'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useEmployeesCount() {
    return useQuery({
        queryKey: ['employees', 'count'],
        queryFn: async () => {
            const page = await Service.search9(undefined, undefined, undefined, 0, 1);
            return page.totalElements;
        },
    })
}
