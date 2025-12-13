'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { TemporaryIssueService } from './service'

const service = new TemporaryIssueService()

export function useDeleteTemporaryIssue() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['temporary-issues'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['temporaryIssues'], exact: false })
            router.refresh()
        },
    })
}
