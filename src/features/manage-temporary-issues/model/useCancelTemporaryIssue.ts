'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useCancelTemporaryIssue() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => Service.cancelTemporaryIssueDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['temporary-issues'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['temporaryIssues'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['temporary-issue'], exact: false })
            router.refresh()
        },
    })
}
