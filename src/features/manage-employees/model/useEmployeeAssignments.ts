import { useQuery } from '@tanstack/react-query'
import { EmployeeService } from './service'

const service = new EmployeeService()

export function useEmployeeAssignments(params: {
    employeeId?: string
    itemId?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['employee-assignments', params],
        queryFn: () => service.getAssignments(params as any),
        enabled: !!params.employeeId,
    })
}
