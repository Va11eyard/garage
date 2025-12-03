'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type IssueDocumentDto } from '@/shared/api/generated/__swagger_client'
import { IssueService } from './service'

const service = new IssueService()

export function useCancelIssue() {
    const queryClient = useQueryClient()

    return useMutation<IssueDocumentDto, Error, string>({
        mutationFn: (id: string) => service.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] })
        },
    })
}
