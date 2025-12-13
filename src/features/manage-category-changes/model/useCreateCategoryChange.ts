'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { CategoryChangeService } from './service'

const service = new CategoryChangeService()

export function useCreateCategoryChange() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: service.create.bind(service),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category-changes'], exact: false })
            router.refresh()
        },
    })
}
