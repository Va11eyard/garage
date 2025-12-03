import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function usePurchasePlans() {
    return useQuery({
        queryKey: ['purchase-plans'],
        queryFn: () => Service.list(),
    })
}
