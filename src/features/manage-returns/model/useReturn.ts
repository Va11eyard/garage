'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ReturnDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useReturn(id: string) {
    return useQuery<ReturnDocumentDto, Error>({
        queryKey: ['returns', id],
        queryFn: () => Service.get14(id),
        enabled: !!id,
    })
}
