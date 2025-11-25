'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PersonDto } from '@/shared/api/generated/__swagger_client'

export function usePerson(id: string) {
    return useQuery<PersonDto, Error>({
        queryKey: ['person', id],
        queryFn: () => Service.get7(id),
        enabled: !!id,
    })
}
