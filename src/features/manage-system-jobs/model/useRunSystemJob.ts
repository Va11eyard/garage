'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { StubService } from '@/shared/api/generated/__swagger_client'

export function useRunSystemJob() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (code: string) => StubService.adminRunSystemJob(code),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['system-jobs'] })
        },
    })
}
