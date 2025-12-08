import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EmployeeCategoryService } from './service'

const service = new EmployeeCategoryService()

export function useUpdateEmployeeCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employee-categories'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['employeeCategories'], exact: false })
        },
    })
}
