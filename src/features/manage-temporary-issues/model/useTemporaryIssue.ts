'use client'

import { useQuery } from '@tanstack/react-query'
import { type TemporaryIssueDocumentDto } from '@/shared/api/generated/__swagger_client'
import { TemporaryIssueService } from './service'

const service = new TemporaryIssueService()

export function useTemporaryIssue(id: string) {
    return useQuery<TemporaryIssueDocumentDto, Error>({
        queryKey: ['temporary-issues', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
