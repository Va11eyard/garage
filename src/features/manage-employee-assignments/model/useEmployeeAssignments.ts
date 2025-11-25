import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

interface AssignmentFilters {
    page?: number
    size?: number
    employeeId?: string
}

export function useEmployeeAssignments(filters: AssignmentFilters = {}) {
    return useQuery({
        queryKey: ['employee-assignments', filters],
        queryFn: () => Service.getAssignments(
            filters.page,
            filters.size,
            undefined
        ),
    })
}
