'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useUpdateQualityAcceptance(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data: any) => Service.updateQualityAcceptanceDocument(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['quality-acceptance'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['quality-acceptance'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['qualityAcceptance'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['qualityAcceptance'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['quality-acceptances'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['quality-acceptances'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['qualityAcceptance', id], exact: false })
            router.refresh()
        },
    })
}
