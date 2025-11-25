'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type WriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useWriteOff(id: string) {
    return useQuery<WriteOffDocumentDto, Error>({
        queryKey: ['write-offs', id],
        queryFn: () => Service.get12(id),
        enabled: !!id,
    })
}
