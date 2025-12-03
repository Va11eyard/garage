'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function usePerson(id: string) {
    return useQuery({
        queryKey: ['persons', id],
        queryFn: () => Service.getPersonById(id),
        enabled: !!id,
    })
}
