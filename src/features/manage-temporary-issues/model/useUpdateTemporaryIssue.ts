'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type TemporaryIssueUpdateRequest, type TemporaryIssueDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateTemporaryIssue(id: string) {
    const queryClient = useQueryClient()

    return useMutation<TemporaryIssueDocumentDto, Error, TemporaryIssueUpdateRequest>({
        mutationFn: (data) => Service.update14(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['temporary-issues'] })
            queryClient.invalidateQueries({ queryKey: ['temporary-issues', id] })
        },
    })
}
