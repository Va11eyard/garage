import { useQuery } from '@tanstack/react-query'
import { ItemGroupService } from './service'

const service = new ItemGroupService()

export function useItemGroupsByParent(parentId: string | undefined) {
    return useQuery({
        queryKey: ['item-groups', 'by-parent', parentId],
        queryFn: () => service.listByParent(parentId!),
        enabled: !!parentId,
    })
}
