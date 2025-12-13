'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useCancelQualityAcceptance() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => Service.cancelQualityAcceptanceDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quality-acceptance'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['qualityAcceptance'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['quality-acceptances'], exact: false })
            router.refresh()
        },
    })
}
