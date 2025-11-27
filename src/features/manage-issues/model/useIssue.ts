'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type IssueDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useIssue(id: string) {
    return useQuery<IssueDocumentDto, Error>({
        queryKey: ['issues', id],
        queryFn: () => Service.get20(id),
        enabled: !!id,
    })
}
