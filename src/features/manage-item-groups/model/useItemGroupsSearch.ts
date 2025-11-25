import { useQuery } from '@tanstack/react-query'
import { ItemGroupService } from './service'

const service = new ItemGroupService()

export function useItemGroupsSearch(params: {
    code?: string
    name?: string
    parentId?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['item-groups', 'search', params],
        queryFn: () => service.search(params),
    })
}
