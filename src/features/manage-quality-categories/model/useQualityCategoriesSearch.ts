import { useQuery } from '@tanstack/react-query'
import { QualityCategoryService } from './service'

const service = new QualityCategoryService()

export function useQualityCategoriesSearch(params: {
    q?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['quality-categories', 'search', params],
        queryFn: () => service.search(params),
    })
}
