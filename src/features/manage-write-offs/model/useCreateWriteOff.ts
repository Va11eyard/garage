'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type WriteOffCreateRequest, type WriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'
import { WriteOffService } from './service'

const service = new WriteOffService()

export function useCreateWriteOff() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<WriteOffDocumentDto, Error, WriteOffCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['write-offs'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['write-offs'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['writeOffs'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['writeOffs'], exact: false })
            router.refresh()
        },
    })
}
