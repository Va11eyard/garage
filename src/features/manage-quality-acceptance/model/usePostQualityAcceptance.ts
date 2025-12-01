'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type QualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'

export function usePostQualityAcceptance() {
    const queryClient = useQueryClient()

    return useMutation<QualityAcceptanceDocumentDto, Error, string>({
        mutationFn: (id: string) => Service.post8(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['qualityAcceptances'] })
        },
    })
}
