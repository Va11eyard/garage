import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ItemSupplyNormService } from './service'

export function useDeleteItemSupplyNorm() {
    const queryClient = useQueryClient()
    const service = new ItemSupplyNormService()

    return useMutation({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['item-supply-norms'] })
            queryClient.invalidateQueries({ queryKey: ['itemSupplyNorms'] })
        },
    })
}
