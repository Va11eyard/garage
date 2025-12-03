'use client'

import { useQuery } from '@tanstack/react-query'
import { type PageEmployeeDto } from '@/shared/api/generated/__swagger_client'
import { EmployeeService } from './service'

const service = new EmployeeService()

export function useEmployees(params: {
    organizationId?: string
    orgUnitId?: string
    personnelNumber?: string
    page?: number
    size?: number
}) {
    return useQuery<PageEmployeeDto, Error>({
        queryKey: ['employees', params],
        queryFn: () => service.search(params),
    })
}
