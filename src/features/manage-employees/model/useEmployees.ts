'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageEmployeeDto } from '@/shared/api/generated/__swagger_client'

export function useEmployees(params: {
    organizationId?: string
    orgUnitId?: string
    personnelNumber?: string
    page?: number
    size?: number
}) {
    return useQuery<PageEmployeeDto, Error>({
        queryKey: ['employees', params],
        queryFn: () => Service.search10(
            params.organizationId,
            params.orgUnitId,
            params.personnelNumber,
            params.page,
            params.size
        ),
    })
}
