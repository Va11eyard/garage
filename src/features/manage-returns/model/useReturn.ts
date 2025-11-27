'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ReturnDocumentDto } from '@/shared/api/generated/__swagger_client'

import { ReturnService } from './service'
const service = new ReturnService()

export function useReturn(id: string) {
    return useQuery<ReturnDocumentDto, Error>({
        queryKey: ['returns', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
