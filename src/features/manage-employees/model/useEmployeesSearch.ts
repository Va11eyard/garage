import { useQuery } from '@tanstack/react-query'
import { EmployeeService } from './service'

const service = new EmployeeService()

export function useEmployeesSearch(params: {
    lastName?: string
    firstName?: string
    middleName?: string
    orgUnitId?: string
    categoryId?: string
    active?: boolean
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['employees', 'search', params],
        queryFn: () => service.search(params),
    })
}
