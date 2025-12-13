'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { QualityAcceptanceService } from './QualityAcceptanceService'

const service = new QualityAcceptanceService()

export function useDeleteQualityAcceptance() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.delete(id),
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
