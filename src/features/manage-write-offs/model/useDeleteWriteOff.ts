'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { WriteOffService } from './service'

const service = new WriteOffService()

export function useDeleteWriteOff() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['write-offs'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['writeOffs'], exact: false })
            router.refresh()
        },
    })
}
