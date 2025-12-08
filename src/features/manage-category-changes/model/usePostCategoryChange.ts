import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CategoryChangeService } from './service'

const service = new CategoryChangeService()

export function usePostCategoryChange() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => service.post(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category-changes'], exact: false })
        },
    })
}
