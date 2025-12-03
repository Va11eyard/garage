'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type IssueDocumentDto } from '@/shared/api/generated/__swagger_client'
import { IssueService } from './service'

const service = new IssueService()

export function usePostIssue() {
    const queryClient = useQueryClient()

    return useMutation<IssueDocumentDto, Error, string>({
        mutationFn: (id: string) => service.post(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] })
        },
    })
}
