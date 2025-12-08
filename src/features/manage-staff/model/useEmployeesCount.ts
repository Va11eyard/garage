'use client'

import { useQuery } from '@tanstack/react-query'
import { EmployeeService } from '@/features/manage-employees/model/service'

const service = new EmployeeService()

export function useEmployeesCount() {
    return useQuery({
        queryKey: ['employees', 'count'],
        queryFn: async () => {
            try {
                const page = await service.search({ page: 0, size: 1 });
                return page.totalElements ?? 0;
            } catch (error) {
                console.error('Error fetching employees count:', error);
                return 0;
            }
        },
        retry: false,
        throwOnError: false,
    })
}
