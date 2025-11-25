'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type UnitOfMeasureDto } from '@/shared/api/generated/__swagger_client'

export function useUnit(id: string) {
    return useQuery<UnitOfMeasureDto, Error>({
        queryKey: ['unit', id],
        queryFn: () => Service.get6(id),
        enabled: !!id,
    })
}
