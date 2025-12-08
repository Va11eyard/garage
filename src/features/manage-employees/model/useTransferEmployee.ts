'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type EmployeeTransferRequest, type EmployeeDto } from '@/shared/api/generated/__swagger_client'

export function useTransferEmployee(id: string) {
    const queryClient = useQueryClient()

    return useMutation<EmployeeDto, Error, EmployeeTransferRequest>({
        mutationFn: (data: EmployeeTransferRequest) => Service.transferEmployee(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['employees', id], exact: false })
        },
    })
}
