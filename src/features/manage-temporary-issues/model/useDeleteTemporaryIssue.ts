'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteTemporaryIssue() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id) => Service.delete14(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['temporary-issues'] })
        },
    })
}
