'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type IssueUpdateRequest, type IssueDocumentDto } from '@/shared/api/generated/__swagger_client'
import { IssueService } from './service'

const service = new IssueService()

export function useUpdateIssue(id: string) {
    const queryClient = useQueryClient()

    return useMutation<IssueDocumentDto, Error, IssueUpdateRequest>({
        mutationFn: (data: any) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] })
            queryClient.invalidateQueries({ queryKey: ['issues', id] })
        },
    })
}
