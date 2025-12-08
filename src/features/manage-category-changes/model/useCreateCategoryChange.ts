import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CategoryChangeService } from './service'

const service = new CategoryChangeService()

export function useCreateCategoryChange() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: service.create.bind(service),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category-changes'], exact: false })
        },
    })
}
