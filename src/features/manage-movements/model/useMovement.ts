'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type MovementDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useMovement(id: string) {
    return useQuery<MovementDocumentDto, Error>({
        queryKey: ['movements', id],
        queryFn: () => Service.get19(id),
        enabled: !!id,
    })
}
