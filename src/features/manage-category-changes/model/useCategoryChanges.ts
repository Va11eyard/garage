import { useQuery } from '@tanstack/react-query'
import { CategoryChangeService } from './service'

const service = new CategoryChangeService()

export function useCategoryChanges(params: {
    warehouseId?: string
    status?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['category-changes', params],
        queryFn: () => service.search(params),
    })
}
