'use client'

import { useQuery } from '@tanstack/react-query'
import { type IssueDocumentDto } from '@/shared/api/generated/__swagger_client'
import { IssueService } from './service'

const service = new IssueService()

export function useIssue(id: string) {
    return useQuery<IssueDocumentDto, Error>({
        queryKey: ['issues', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
