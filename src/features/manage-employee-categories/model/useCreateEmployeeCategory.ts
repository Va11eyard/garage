import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EmployeeCategoryService } from './service'

const service = new EmployeeCategoryService()

export function useCreateEmployeeCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: service.create.bind(service),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employee-categories'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['employeeCategories'], exact: false })
        },
    })
}
