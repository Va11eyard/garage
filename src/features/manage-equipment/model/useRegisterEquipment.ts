'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { EquipmentService } from './service'

const service = new EquipmentService()

export function useRegisterEquipment() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: service.register.bind(service),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['equipment'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['equipment'], exact: false })
            router.refresh()
        },
    })
}
