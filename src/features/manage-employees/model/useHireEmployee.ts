'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service, type EmployeeHireRequest, type EmployeeDto } from '@/shared/api/generated/__swagger_client'

export function useHireEmployee() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<EmployeeDto, Error, EmployeeHireRequest>({
        mutationFn: (data: EmployeeHireRequest) => Service.hireEmployee(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['employees'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false })
            router.refresh()
        },
    })
}
