'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { PersonCreateRequest } from '@/shared/api/generated/__swagger_client'
import { PersonService } from './service'

const service = new PersonService()

export function useCreatePerson() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data: PersonCreateRequest) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['persons'], exact: false })
            router.refresh()
        },
    })
}
