'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type TemporaryIssueCreateRequest, type TemporaryIssueDocumentDto } from '@/shared/api/generated/__swagger_client'
import { TemporaryIssueService } from './service'

const service = new TemporaryIssueService()

export function useCreateTemporaryIssue() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<TemporaryIssueDocumentDto, Error, TemporaryIssueCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['temporary-issues'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['temporaryIssues'], exact: false })
            router.refresh()
        },
    })
}
