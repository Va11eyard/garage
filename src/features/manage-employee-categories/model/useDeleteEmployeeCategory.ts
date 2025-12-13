'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { EmployeeCategoryService } from './service'

const service = new EmployeeCategoryService()

export function useDeleteEmployeeCategory() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employee-categories'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['employeeCategories'], exact: false })
            router.refresh()
        },
    })
}
