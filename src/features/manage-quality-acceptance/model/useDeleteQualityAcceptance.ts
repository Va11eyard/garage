'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteQualityAcceptance() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id) => Service.delete18(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quality-acceptance'] })
        },
    })
}
