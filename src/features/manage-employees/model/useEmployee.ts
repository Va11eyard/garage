'use client'

import { useQuery } from '@tanstack/react-query'
import { type EmployeeDto } from '@/shared/api/generated/__swagger_client'
import { EmployeeService } from './service'

const service = new EmployeeService()

export function useEmployee(id: string) {
    return useQuery<EmployeeDto, Error>({
        queryKey: ['employee', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
