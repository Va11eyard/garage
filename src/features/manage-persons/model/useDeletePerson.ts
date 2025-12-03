'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PersonService } from './service'

const service = new PersonService()

export function useDeletePerson() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['persons'] })
        },
    })
}
