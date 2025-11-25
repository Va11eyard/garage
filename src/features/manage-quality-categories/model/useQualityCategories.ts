import { useQuery } from '@tanstack/react-query'
import { QualityCategoryService } from './service'

const service = new QualityCategoryService()

export function useQualityCategories() {
    return useQuery({
        queryKey: ['quality-categories'],
        queryFn: () => service.list(),
    })
}
