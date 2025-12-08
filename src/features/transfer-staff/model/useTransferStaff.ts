'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TransferStaffService } from './service'

const service = new TransferStaffService()

export function useTransferStaff() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, { employeeId: string; newOrgUnitId: string }>({
        mutationFn: ({ employeeId, newOrgUnitId }: { employeeId: string; newOrgUnitId: string }) => 
            service.transfer(employeeId, newOrgUnitId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['staff'], exact: false })
        },
    })
}
