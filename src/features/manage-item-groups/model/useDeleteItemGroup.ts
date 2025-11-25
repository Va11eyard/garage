'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteItemGroup() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id) => Service.delete9(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['item-groups'] })
        },
    })
}
