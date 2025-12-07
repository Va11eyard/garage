'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IssueService } from './service'

const service = new IssueService()

export function useCancelIssue() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => service.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] })
        },
    })
}
