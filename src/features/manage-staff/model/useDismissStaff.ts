'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type EmployeeDismissRequest } from '@/shared/api/generated/__swagger_client'

export function useDismissStaff() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: EmployeeDismissRequest }) => Service.dismiss(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff'] })
        },
    })
}
