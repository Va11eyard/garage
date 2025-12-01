'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type WriteOffUpdateRequest, type WriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'
import { WriteOffService} from "@/features/manage-write-offs/model/service";
const service = new WriteOffService();
export function useUpdateWriteOff(id: string) {
    const queryClient = useQueryClient()

    return useMutation<WriteOffDocumentDto, Error, WriteOffUpdateRequest>({
        mutationFn: (data: any) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['write-offs'] })
            queryClient.invalidateQueries({ queryKey: ['write-offs', id] })
        },
    })
}
