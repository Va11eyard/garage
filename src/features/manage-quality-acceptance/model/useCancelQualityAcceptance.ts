'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type QualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'
import { QualityAcceptanceService } from './QualityAcceptanceService'

const service = new QualityAcceptanceService()

export function useCancelQualityAcceptance() {
    const queryClient = useQueryClient()

    return useMutation<QualityAcceptanceDocumentDto, Error, string>({
        mutationFn: (id: string) => service.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['qualityAcceptances'] })
        },
    })
}
