'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TransferStaffService } from './service'
import type { EmployeeDto } from '@/shared/api/generated/__swagger_client'

const service = new TransferStaffService()

export function useTransferStaff() {
    const queryClient = useQueryClient()

    return useMutation<EmployeeDto, Error, { employeeId: string; newOrgUnitId: string }>({
        mutationFn: ({ employeeId, newOrgUnitId }: { employeeId: string; newOrgUnitId: string }) => 
            service.transfer(employeeId, newOrgUnitId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['staff'], exact: false })
        },
    })
}
