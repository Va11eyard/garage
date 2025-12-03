'use client'

import { useQuery } from '@tanstack/react-query'
import { type PageEmployeeDto } from '@/shared/api/generated/__swagger_client'
import { EmployeeService } from '@/features/manage-employees/model/service'

const service = new EmployeeService()

export function useStaff(params: {
    organizationId?: string
    orgUnitId?: string
    personnelNumber?: string
    page?: number
    size?: number
}) {
    return useQuery<PageEmployeeDto, Error>({
        queryKey: ['staff', params],
        queryFn: () => service.search({
            organizationId: params.organizationId,
            orgUnitId: params.orgUnitId,
            personnelNumber: params.personnelNumber,
            page: params.page,
            size: params.size
        }),
    })
}
