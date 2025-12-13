'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { PersonService } from './service'

const service = new PersonService()

export function useDeletePerson() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['persons'], exact: false })
            router.refresh()
        },
    })
}
