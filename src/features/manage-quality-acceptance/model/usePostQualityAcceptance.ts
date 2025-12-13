'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function usePostQualityAcceptance() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => Service.postQualityAcceptanceDocument(id),
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
