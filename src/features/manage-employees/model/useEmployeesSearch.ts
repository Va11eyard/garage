import { useQuery } from '@tanstack/react-query'
import { EmployeeService } from './service'

const service = new EmployeeService()

export function useEmployeesSearch(params: {
    organizationId?: string
    orgUnitId?: string
    personnelNumber?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['employees', 'search', params],
        queryFn: () => service.search(params),
    })
}
