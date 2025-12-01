'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type IssueCreateRequest, type IssueDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCreateIssue() {
    const queryClient = useQueryClient()

    return useMutation<IssueDocumentDto, Error, IssueCreateRequest>({
        mutationFn: (data: any) => Service.create23(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] })
        },
    })
}
