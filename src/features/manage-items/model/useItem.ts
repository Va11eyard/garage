'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type ItemDto } from '@/shared/api/generated/__swagger_client'
import {ItemService} from "./service";
const service = new ItemService();

export function useItem(id?: string) {
    return useQuery<ItemDto, Error>({
        queryKey: ['items', id],
        queryFn: () => service.get(id!),
        enabled: !!id,
    })
}
