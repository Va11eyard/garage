import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

interface AssignmentFilters {
    id: string
    page?: number
    size?: number
    employeeId?: string
}

export function useEmployeeAssignments(filters: AssignmentFilters = {
    id: ""
}) {
    return useQuery({
        queryKey: ['employee-assignments', filters],
        queryFn: () => Service.get29(
            filters.id,
        ),
    })
}
