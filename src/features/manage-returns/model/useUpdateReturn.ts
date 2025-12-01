'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReturnUpdateRequest, type ReturnDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReturnService } from "./service";
const service = new ReturnService();
export function useUpdateReturn(id: string) {
    const queryClient = useQueryClient()

    return useMutation<ReturnDocumentDto, Error, ReturnUpdateRequest>({
        mutationFn: (data: any) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'] })
            queryClient.invalidateQueries({ queryKey: ['returns', id] })
        },
    })
}
