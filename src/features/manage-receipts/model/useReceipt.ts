'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useReceipt(id: string) {
    return useQuery<ReceiptDocumentDto, Error>({
        queryKey: ['receipts', id],
        queryFn: () => Service.get16(id),
        enabled: !!id,
    })
}
