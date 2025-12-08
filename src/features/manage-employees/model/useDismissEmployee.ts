'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type EmployeeDismissRequest, type EmployeeDto } from '@/shared/api/generated/__swagger_client'

export function useDismissEmployee(id: string) {
    const queryClient = useQueryClient()

    return useMutation<EmployeeDto, Error, EmployeeDismissRequest>({
        mutationFn: (data: EmployeeDismissRequest) => Service.dismissEmployee(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['employees', id], exact: false })
        },
    })
}
