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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category-changes'], exact: false })
            router.refresh()
        },
    })
}
