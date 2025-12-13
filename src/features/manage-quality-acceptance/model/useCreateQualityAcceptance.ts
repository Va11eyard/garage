'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type QualityAcceptanceCreateRequest, type QualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'
import { QualityAcceptanceService } from './QualityAcceptanceService'

const service = new QualityAcceptanceService()

export function useCreateQualityAcceptance() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<QualityAcceptanceDocumentDto, Error, QualityAcceptanceCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['quality-acceptance'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['quality-acceptance'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['qualityAcceptance'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['qualityAcceptance'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['quality-acceptances'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['quality-acceptances'], exact: false })
            router.refresh()
        },
    })
}
