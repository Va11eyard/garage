'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type QualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'
import { QualityAcceptanceService } from './QualityAcceptanceService'

const service = new QualityAcceptanceService()

export function usePostQualityAcceptance() {
    const queryClient = useQueryClient()

    return useMutation<QualityAcceptanceDocumentDto, Error, string>({
        mutationFn: (id: string) => service.post(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['qualityAcceptances'] })
        },
    })
}
