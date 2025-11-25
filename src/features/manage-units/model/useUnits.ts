import { useQuery } from '@tanstack/react-query'
import { UnitOfMeasureService } from './service'

const service = new UnitOfMeasureService()

export function useUnits() {
    return useQuery({
        queryKey: ['units'],
        queryFn: () => service.list(),
    })
}
