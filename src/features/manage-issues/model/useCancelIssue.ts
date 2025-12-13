'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { IssueService } from './service'

const service = new IssueService()

export function useCancelIssue() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => service.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'], exact: false })
            router.refresh()
        },
    })
}
