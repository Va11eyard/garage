'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type Page } from '@/shared/api/generated/__swagger_client'

export function useReplacementOrders(params: {
    warehouseId?: string
    employeeId?: string
    page?: number
    size?: number
}) {
    return useQuery<Page, Error>({
        queryKey: ['replacement-orders', params],
        queryFn: async () => {
            const pageable = {
                page: params.page,
                size: params.size,
                sort: []
            }
            
            if (params.warehouseId) {
                return Service.searchReplacementOrdersByWarehouse(params.warehouseId, pageable)
            }
            if (params.employeeId) {
                return Service.searchReplacementOrdersByEmployee(params.employeeId, pageable)
            }
            return { content: [], totalElements: 0, totalPages: 0, last: true, first: true }
        },
    })
}
