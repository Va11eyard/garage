'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type TemporaryIssueCreateRequest, type TemporaryIssueDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCreateTemporaryIssue() {
    const queryClient = useQueryClient()

    return useMutation<TemporaryIssueDocumentDto, Error, TemporaryIssueCreateRequest>({
        mutationFn: (data) => Service.create17(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['temporary-issues'] })
        },
    })
}
