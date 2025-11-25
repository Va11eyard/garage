'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type UnitOfMeasureUpdateRequest, type UnitOfMeasureDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateUnit() {
    const queryClient = useQueryClient()

    return useMutation<UnitOfMeasureDto, Error, { id: string; data: UnitOfMeasureUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: UnitOfMeasureUpdateRequest }) => Service.update6(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['units'] })
            queryClient.invalidateQueries({ queryKey: ['unit'] })
        },
    })
}
