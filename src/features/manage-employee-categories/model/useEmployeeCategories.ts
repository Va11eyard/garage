import { useQuery } from '@tanstack/react-query'
import { EmployeeCategoryService } from './service'

const service = new EmployeeCategoryService()

export function useEmployeeCategories() {
    return useQuery({
        queryKey: ['employee-categories'],
        queryFn: () => service.list(),
    })
}
