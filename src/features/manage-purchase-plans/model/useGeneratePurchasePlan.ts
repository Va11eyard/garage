import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useGeneratePurchasePlan() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (request: any) => Service.generatePlan(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['purchase-plans'] })
        },
    })
}
