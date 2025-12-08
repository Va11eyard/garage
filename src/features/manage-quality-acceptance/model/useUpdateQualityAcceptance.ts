'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useUpdateQualityAcceptance(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: any) => Service.updateQualityAcceptanceDocument(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quality-acceptance'] })
            queryClient.invalidateQueries({ queryKey: ['qualityAcceptance'] })
            queryClient.invalidateQueries({ queryKey: ['quality-acceptances'] })
            queryClient.invalidateQueries({ queryKey: ['qualityAcceptance', id] })
        },
    })
}
