'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useSendDeviceError() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ code, message }: { code: string; message: string }) => 
            Service.reportDeviceError(code, message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['equipment'], exact: false })
        },
    })
}
