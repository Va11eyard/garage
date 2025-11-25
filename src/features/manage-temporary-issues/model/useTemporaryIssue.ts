'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type TemporaryIssueDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useTemporaryIssue(id: string) {
    return useQuery<TemporaryIssueDocumentDto, Error>({
        queryKey: ['temporary-issues', id],
        queryFn: () => Service.get13(id),
        enabled: !!id,
    })
}
