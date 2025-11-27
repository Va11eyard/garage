'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type QualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCancelQualityAcceptance() {
    const queryClient = useQueryClient()

    return useMutation<QualityAcceptanceDocumentDto, Error, string>({
        mutationFn: (id) => Service.cancel4(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['qualityAcceptances'] })
        },
    })
}
