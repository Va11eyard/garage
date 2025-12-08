'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QualityAcceptanceService } from './QualityAcceptanceService'

const service = new QualityAcceptanceService()

export function useDeleteQualityAcceptance() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quality-acceptance'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['qualityAcceptance'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['quality-acceptances'], exact: false })
        },
    })
}
