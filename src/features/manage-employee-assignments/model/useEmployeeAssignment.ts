import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useEmployeeAssignment(id: string) {
    return useQuery({
        queryKey: ['employee-assignment', id],
        queryFn: () => Service.getEmployeeItemAssignmentById(id),
        enabled: !!id,
    })
}
