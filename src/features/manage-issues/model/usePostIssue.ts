'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IssueService } from './service'

const service = new IssueService()

export function usePostIssue() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => service.post(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] })
        },
    })
}
