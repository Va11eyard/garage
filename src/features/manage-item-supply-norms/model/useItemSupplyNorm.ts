import { useQuery } from '@tanstack/react-query'
import { ItemSupplyNormService } from './service'

export function useItemSupplyNorm(id: string) {
    const service = new ItemSupplyNormService()
    return useQuery({
        queryKey: ['item-supply-norm', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
