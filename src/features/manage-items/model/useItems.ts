'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageItemDto } from '@/shared/api/generated/__swagger_client'
import {ItemService} from "./service";
const service = new ItemService();

export function useItems(params: {
    code?: string
    name?: string
    itemGroupId?: string
    page?: number
    size?: number
}) {
    return useQuery<PageItemDto, Error>({
        queryKey: ['items', params],
        queryFn: () => service.search({
            code: params.code,
            name: params.name,
            groupId: params.itemGroupId,
            page: params.page,
            size: params.size
        }),
    })
}
