'use client'

import { useQuery } from '@tanstack/react-query'
import { type MovementDocumentDto } from '@/shared/api/generated/__swagger_client'
import { MovementService } from './service'

const service = new MovementService()

export function useMovement(id: string) {
    return useQuery<MovementDocumentDto, Error>({
        queryKey: ['movements', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
