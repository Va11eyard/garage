'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type QualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useQualityAcceptance(id: string) {
    return useQuery<QualityAcceptanceDocumentDto, Error>({
        queryKey: ['quality-acceptance', id],
        queryFn: () => Service.get17(id),
        enabled: !!id,
    })
}
