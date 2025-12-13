'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type IssueUpdateRequest, type IssueDocumentDto } from '@/shared/api/generated/__swagger_client'
import { IssueService } from './service'

const service = new IssueService()

export function useUpdateIssue(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<IssueDocumentDto, Error, IssueUpdateRequest>({
        mutationFn: (data: any) => service.update(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['issues'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['issues'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['issues', id], exact: false })
            router.refresh()
        },
    })
}
