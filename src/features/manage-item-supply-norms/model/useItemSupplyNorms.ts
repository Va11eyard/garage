import { useQuery } from '@tanstack/react-query'
import { ItemSupplyNormService } from './service'

export function useItemSupplyNorms(params: {
    employeeCategoryId?: string
    itemId?: string
    page?: number
    size?: number
}) {
    const service = new ItemSupplyNormService()
    return useQuery({
        queryKey: ['item-supply-norms', params],
        queryFn: () => service.search(params),
    })
}
