'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import {ItemService} from "./service";
const service = new ItemService();

export function useItemsCount() {
    return useQuery({
        queryKey: ['items', 'count'],
        queryFn: async () => {
            const page = await service.search(undefined, undefined, undefined, 0, 1);
            return page.totalElements;
        },
    })
}
