import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function usePurchasePlan(id: string) {
    return useQuery({
        queryKey: ['purchase-plan', id],
        queryFn: () => Service.get24(id),
        enabled: !!id,
    })
}
