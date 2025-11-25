import { useQuery } from '@tanstack/react-query'
import { WarehouseCellService } from './service'

const service = new WarehouseCellService()

export function useWarehouseCellsByZone(zoneId: string | undefined) {
    return useQuery({
        queryKey: ['warehouse-cells', 'by-zone', zoneId],
        queryFn: () => service.listByZone(zoneId!),
        enabled: !!zoneId,
    })
}
