import { useQuery } from '@tanstack/react-query'
import { UnitOfMeasureService } from './service'

const service = new UnitOfMeasureService()

export function useUnitsSearch(params: {
    code?: string
    name?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['units', 'search', params],
        queryFn: () => service.search(params),
    })
}
