'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type QualityAcceptanceUpdateRequest, type QualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateQualityAcceptance(id: string) {
    const queryClient = useQueryClient()

    return useMutation<QualityAcceptanceDocumentDto, Error, QualityAcceptanceUpdateRequest>({
        mutationFn: (data) => Service.update17(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quality-acceptance'] })
            queryClient.invalidateQueries({ queryKey: ['quality-acceptance', id] })
        },
    })
}
