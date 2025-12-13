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
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['temporary-issues'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['temporary-issues'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['temporaryIssues'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['temporaryIssues'], exact: false })
            router.refresh()
        },
    })
}
