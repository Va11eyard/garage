'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type UnitOfMeasureUpdateRequest, type UnitOfMeasureDto } from '@/shared/api/generated/__swagger_client'
import { UnitOfMeasureService } from './service'

const service = new UnitOfMeasureService()

export function useUpdateUnit() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<UnitOfMeasureDto, Error, { id: string; data: UnitOfMeasureUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: UnitOfMeasureUpdateRequest }) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['units'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['unit'], exact: false })
            router.refresh()
        },
    })
}
