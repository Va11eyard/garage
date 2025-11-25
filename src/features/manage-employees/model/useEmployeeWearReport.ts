import { useQuery } from '@tanstack/react-query'
import { EmployeeService } from './service'

const service = new EmployeeService()

export function useEmployeeWearReport(params: {
    employeeId?: string
    itemId?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['employee-wear-report', params],
        queryFn: () => service.getWearReport(params),
        enabled: !!params.employeeId,
    })
}
