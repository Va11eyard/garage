'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { EmployeeService } from './service'

const service = new EmployeeService()

export function useDeleteEmployee() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['employees'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['employees'], exact: false })
            router.refresh()
        },
    })
}
