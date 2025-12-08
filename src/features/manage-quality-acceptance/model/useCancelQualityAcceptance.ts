'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useCancelQualityAcceptance() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => Service.cancelQualityAcceptanceDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quality-acceptance'] })
            queryClient.invalidateQueries({ queryKey: ['qualityAcceptance'] })
            queryClient.invalidateQueries({ queryKey: ['quality-acceptances'] })
        },
    })
}
