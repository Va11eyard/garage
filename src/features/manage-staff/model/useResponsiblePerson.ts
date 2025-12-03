'use client'

import { useQuery } from '@tanstack/react-query'
import { StaffService } from './service'

const service = new StaffService()

export function useResponsiblePerson(id: string) {
    return useQuery({
        queryKey: ['responsiblePersons', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
