import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useEmployeeAssignmentsByEmployee(employeeId: string) {
    return useQuery({
        queryKey: ['employee-assignments', 'by-employee', employeeId],
        queryFn: () => Service.getEmployeeItemAssignmentsByEmployee(employeeId),
        enabled: !!employeeId,
    })
}
