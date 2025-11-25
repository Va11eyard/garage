'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type EmployeeTransferRequest, type EmployeeDto } from '@/shared/api/generated/__swagger_client'

export function useTransferEmployee(id: string) {
    const queryClient = useQueryClient()

    return useMutation<EmployeeDto, Error, EmployeeTransferRequest>({
        mutationFn: (data) => Service.transfer(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] })
            queryClient.invalidateQueries({ queryKey: ['employees', id] })
        },
    })
}
