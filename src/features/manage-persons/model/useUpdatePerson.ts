'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type PersonUpdateRequest, type PersonDto } from '@/shared/api/generated/__swagger_client'

export function useUpdatePerson() {
    const queryClient = useQueryClient()

    return useMutation<PersonDto, Error, { id: string; data: PersonUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: PersonUpdateRequest }) => Service.update12(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['persons'] })
            queryClient.invalidateQueries({ queryKey: ['person'] })
        },
    })
}
