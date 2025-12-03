'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type PersonCreateRequest, type PersonDto } from '@/shared/api/generated/__swagger_client'

export function useCreateStaff() {
    const queryClient = useQueryClient()

    return useMutation<PersonDto, Error, PersonCreateRequest>({
        mutationFn: (data: PersonCreateRequest) => Service.createPerson(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff'] })
            queryClient.invalidateQueries({ queryKey: ['persons'] })
        },
    })
}
