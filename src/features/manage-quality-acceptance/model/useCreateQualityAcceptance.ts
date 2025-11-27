'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type QualityAcceptanceCreateRequest, type QualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCreateQualityAcceptance() {
    const queryClient = useQueryClient()

    return useMutation<QualityAcceptanceDocumentDto, Error, QualityAcceptanceCreateRequest>({
        mutationFn: (data) => Service.create21(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quality-acceptance'] })
        },
    })
}
