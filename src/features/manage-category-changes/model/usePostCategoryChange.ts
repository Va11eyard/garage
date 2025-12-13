'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { CategoryChangeService } from './service'

const service = new CategoryChangeService()

export function usePostCategoryChange() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => service.post(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['category-changes'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['category-changes'], exact: false })
            router.refresh()
        },
    })
}
