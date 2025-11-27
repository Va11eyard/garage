'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type WriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'
import { WriteOffService} from "@/features/manage-write-offs/model/service";
const service = new WriteOffService();
export function useWriteOff(id: string) {
    return useQuery<WriteOffDocumentDto, Error>({
        queryKey: ['write-offs', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
