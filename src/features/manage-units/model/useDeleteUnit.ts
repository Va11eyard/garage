'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { UnitOfMeasureService } from './service'

const service = new UnitOfMeasureService()

export function useDeleteUnit() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['units'], exact: false })
            router.refresh()
        },
    })
}
