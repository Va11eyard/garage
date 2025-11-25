'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type IssueUpdateRequest, type IssueDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateIssue(id: string) {
    const queryClient = useQueryClient()

    return useMutation<IssueDocumentDto, Error, IssueUpdateRequest>({
        mutationFn: (data) => Service.update19(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] })
            queryClient.invalidateQueries({ queryKey: ['issues', id] })
        },
    })
}
