import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EmployeeCategoryService } from './service'

const service = new EmployeeCategoryService()

export function useDeleteEmployeeCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employee-categories'] })
            queryClient.invalidateQueries({ queryKey: ['employeeCategories'] })
        },
    })
}
