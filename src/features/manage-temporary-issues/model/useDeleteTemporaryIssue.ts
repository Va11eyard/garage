'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TemporaryIssueService } from './service'

const service = new TemporaryIssueService()

export function useDeleteTemporaryIssue() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['temporary-issues'] })
            queryClient.invalidateQueries({ queryKey: ['temporaryIssues'] })
        },
    })
}
