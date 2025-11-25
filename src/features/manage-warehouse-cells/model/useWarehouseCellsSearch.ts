import { useQuery } from '@tanstack/react-query'
import { WarehouseCellService } from './service'

const service = new WarehouseCellService()

export function useWarehouseCellsSearch(params: {
    warehouseId?: string
    zoneId?: string
    code?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['warehouse-cells', 'search', params],
        queryFn: () => service.search(params),
    })
}
