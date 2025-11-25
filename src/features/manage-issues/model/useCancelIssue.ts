'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type IssueDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCancelIssue() {
    const queryClient = useQueryClient()

    return useMutation<IssueDocumentDto, Error, string>({
        mutationFn: (id) => Service.cancel5(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] })
        },
    })
}
