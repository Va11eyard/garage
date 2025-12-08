import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import type { ItemGroupCreateRequest } from '@/shared/api/generated/__swagger_client'

import { ItemGroupService } from "./service";
const service = new ItemGroupService();

export function useCreateItemGroup() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ItemGroupCreateRequest) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['item-groups'] })
            queryClient.invalidateQueries({ queryKey: ['itemGroups'] })
        },
    })
}
