'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function usePostTemporaryIssue() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => Service.postTemporaryIssueDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['temporary-issues'] })
            queryClient.invalidateQueries({ queryKey: ['temporary-issue'] })
        },
    })
}
