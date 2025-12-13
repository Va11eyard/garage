'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type TemporaryIssueUpdateRequest, type TemporaryIssueDocumentDto } from '@/shared/api/generated/__swagger_client'
import { TemporaryIssueService } from './service'

const service = new TemporaryIssueService()

export function useUpdateTemporaryIssue(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<TemporaryIssueDocumentDto, Error, TemporaryIssueUpdateRequest>({
        mutationFn: (data: any) => service.update(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['temporary-issues'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['temporary-issues'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['temporaryIssues'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['temporaryIssues'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['temporary-issues', id], exact: false })
            router.refresh()
        },
    })
}
