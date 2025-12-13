'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function usePostTemporaryIssue() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => Service.postTemporaryIssueDocument(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['temporary-issues'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['temporary-issues'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['temporaryIssues'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['temporaryIssues'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['temporary-issue'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['temporary-issue'], exact: false })
            router.refresh()
        },
    })
}
