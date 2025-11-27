'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReceiptService } from './service'
const service = new ReceiptService()
export function useReceipt(id: string) {
    return useQuery<ReceiptDocumentDto, Error>({
        queryKey: ['receipts', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
