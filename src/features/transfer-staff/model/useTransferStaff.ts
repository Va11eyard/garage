'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { TransferStaffService } from './service'
import type { EmployeeDto } from '@/shared/api/generated/__swagger_client'

const service = new TransferStaffService()

export function useTransferStaff() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<EmployeeDto, Error, { employeeId: string; newOrgUnitId: string }>({
        mutationFn: ({ employeeId, newOrgUnitId }: { employeeId: string; newOrgUnitId: string }) => 
            service.transfer(employeeId, newOrgUnitId),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['employees'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['staff'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['staff'], exact: false })
            router.refresh()
        },
    })
}
