'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EmployeeService } from './service'

const service = new EmployeeService()

export function useDeleteEmployee() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] })
        },
    })
}
