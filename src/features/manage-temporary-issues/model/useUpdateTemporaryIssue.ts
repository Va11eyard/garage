'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type TemporaryIssueUpdateRequest, type TemporaryIssueDocumentDto } from '@/shared/api/generated/__swagger_client'
import { TemporaryIssueService } from './service'

const service = new TemporaryIssueService()

export function useUpdateTemporaryIssue(id: string) {
    const queryClient = useQueryClient()

    return useMutation<TemporaryIssueDocumentDto, Error, TemporaryIssueUpdateRequest>({
        mutationFn: (data: any) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['temporary-issues'] })
            queryClient.invalidateQueries({ queryKey: ['temporary-issues', id] })
        },
    })
}
