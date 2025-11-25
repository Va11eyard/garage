'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type EmployeeDto } from '@/shared/api/generated/__swagger_client'

export function useEmployee(id: string) {
    return useQuery<EmployeeDto, Error>({
        queryKey: ['employee', id],
        queryFn: () => Service.get10(id),
        enabled: !!id,
    })
}
