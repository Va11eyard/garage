'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { EmployeeCategoryService } from './service'

const service = new EmployeeCategoryService()

export function useUpdateEmployeeCategory() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => service.update(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['employee-categories'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['employee-categories'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['employeeCategories'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['employeeCategories'], exact: false })
            router.refresh()
        },
    })
}
