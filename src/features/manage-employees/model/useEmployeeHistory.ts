import { useQuery } from '@tanstack/react-query'
import { EmployeeService } from './service'

const service = new EmployeeService()

export function useEmployeeHistory(employeeId: string | undefined) {
    return useQuery({
        queryKey: ['employee-history', employeeId],
        queryFn: () => service.getHistory(employeeId!),
        enabled: !!employeeId,
    })
}
