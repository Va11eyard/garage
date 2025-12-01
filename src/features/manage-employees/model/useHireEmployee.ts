'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type EmployeeHireRequest, type EmployeeDto } from '@/shared/api/generated/__swagger_client'

export function useHireEmployee() {
    const queryClient = useQueryClient()

    return useMutation<EmployeeDto, Error, EmployeeHireRequest>({
        mutationFn: (data: EmployeeHireRequest) => Service.hire(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] })
        },
    })
}
