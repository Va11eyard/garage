'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service, type EmployeeDismissRequest } from '@/shared/api/generated/__swagger_client'

export function useDismissStaff() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: EmployeeDismissRequest }) => Service.dismissEmployee(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['staff'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['staff'], exact: false })
            router.refresh()
        },
    })
}
