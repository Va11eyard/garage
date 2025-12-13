'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { IssueService } from './service'

const service = new IssueService()

export function usePostIssue() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => service.post(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'], exact: false })
            router.refresh()
        },
    })
}
