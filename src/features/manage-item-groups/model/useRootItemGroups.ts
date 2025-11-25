import { useQuery } from '@tanstack/react-query'
import { ItemGroupService } from './service'

const service = new ItemGroupService()

export function useRootItemGroups() {
    return useQuery({
        queryKey: ['item-groups', 'root'],
        queryFn: () => service.listRootGroups(),
    })
}
