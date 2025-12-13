'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service, type EmployeeTransferRequest, type EmployeeDto } from '@/shared/api/generated/__swagger_client'

export function useTransferEmployee(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<EmployeeDto, Error, EmployeeTransferRequest>({
        mutationFn: (data: EmployeeTransferRequest) => Service.transferEmployee(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['employees'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['employees', id], exact: false })
            router.refresh()
        },
    })
}
