import { useQuery } from '@tanstack/react-query'
import { EmployeeCategoryService } from './service'

const service = new EmployeeCategoryService()

export function useEmployeeCategory(id: string | undefined) {
    return useQuery({
        queryKey: ['employee-category', id],
        queryFn: () => service.get(id!),
        enabled: !!id,
    })
}
