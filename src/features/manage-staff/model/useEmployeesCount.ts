'use client'

import { useQuery } from '@tanstack/react-query'
import { EmployeeService } from '@/features/manage-employees/model/service'

const service = new EmployeeService()

export function useEmployeesCount() {
    return useQuery({
        queryKey: ['employees', 'count'],
        queryFn: async () => {
            const page = await service.search({ page: 0, size: 1 });
            return page.totalElements;
        },
    })
}
