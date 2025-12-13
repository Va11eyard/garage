'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { PurchasePlanService } from './service'

const service = new PurchasePlanService()

export function useChangePurchasePlanStatus() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: 'DRAFT' | 'APPROVED' | 'SENT' | 'CLOSED' }) =>
            service.changeStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['purchase-plans'], exact: false })
            router.refresh()
        },
    })
}
