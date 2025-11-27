'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteIssue() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id) => Service.delete20(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] })
        },
    })
}
