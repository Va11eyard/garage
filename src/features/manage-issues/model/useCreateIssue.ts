'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type IssueCreateRequest, type IssueDocumentDto } from '@/shared/api/generated/__swagger_client'
import { IssueService } from './service'

const service = new IssueService()

export function useCreateIssue() {
    const queryClient = useQueryClient()

    return useMutation<IssueDocumentDto, Error, IssueCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'], exact: false })
        },
    })
}
