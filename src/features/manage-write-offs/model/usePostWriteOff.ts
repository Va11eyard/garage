'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type WriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'
import { WriteOffService} from "@/features/manage-write-offs/model/service";
const service = new WriteOffService();
export function usePostWriteOff() {
    const queryClient = useQueryClient()

    return useMutation<WriteOffDocumentDto, Error, string>({
        mutationFn: (id) => service.post(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['writeOffs'] })
        },
    })
}
