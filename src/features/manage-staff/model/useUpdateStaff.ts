'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type PersonUpdateRequest, type PersonDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateStaff() {
    const queryClient = useQueryClient()

    return useMutation<PersonDto, Error, { id: string; data: PersonUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: PersonUpdateRequest }) => 
            Service.updatePerson(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['persons'], exact: false })
        },
    })
}
