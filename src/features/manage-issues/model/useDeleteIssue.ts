'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IssueService } from './service'

const service = new IssueService()

export function useDeleteIssue() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] })
        },
    })
}
