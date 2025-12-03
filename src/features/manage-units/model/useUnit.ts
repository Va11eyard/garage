'use client'

import { useQuery } from '@tanstack/react-query'
import { type UnitOfMeasureDto } from '@/shared/api/generated/__swagger_client'
import { UnitOfMeasureService } from './service'

const service = new UnitOfMeasureService()

export function useUnit(id: string) {
    return useQuery<UnitOfMeasureDto, Error>({
        queryKey: ['unit', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
