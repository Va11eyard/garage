'use client'

import { useQuery } from '@tanstack/react-query'
import {ItemService} from "./service";
const service = new ItemService();

export function useItemsCount() {
    return useQuery({
        queryKey: ['items', 'count'],
        queryFn: async () => {
            const page = await service.search({ page: 0, size: 1 });
            return page.totalElements;
        },
    })
}
