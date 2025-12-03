'use client'

import { useQuery } from '@tanstack/react-query'
import { type QualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'
import { QualityAcceptanceService } from './QualityAcceptanceService'

const service = new QualityAcceptanceService()

export function useQualityAcceptance(id: string) {
    return useQuery<QualityAcceptanceDocumentDto, Error>({
        queryKey: ['quality-acceptance', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
