'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { StubService } from '@/shared/api/generated/__swagger_client'

export function useRunSystemJob() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (code: string) => StubService.adminRunSystemJob(code),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['system-jobs'], exact: false })
            router.refresh()
        },
    })
}
