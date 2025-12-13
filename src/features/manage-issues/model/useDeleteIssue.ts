'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { IssueService } from './service'

const service = new IssueService()

export function useDeleteIssue() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'], exact: false })
            router.refresh()
        },
    })
}
