'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { EmployeeCategoryService } from './service'

const service = new EmployeeCategoryService()

export function useCreateEmployeeCategory() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: service.create.bind(service),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['employee-categories'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['employee-categories'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['employeeCategories'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['employeeCategories'], exact: false })
            router.refresh()
        },
    })
}
