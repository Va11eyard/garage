'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { PersonUpdateRequest, PersonDto } from '@/shared/api/generated/__swagger_client'
import { PersonService } from './service'

const service = new PersonService()

type UpdatePersonVariables = {
    id: string
    data: PersonUpdateRequest
}

export function useUpdatePerson() {
    const queryClient = useQueryClient()

    return useMutation<PersonDto, Error, UpdatePersonVariables>({
        mutationFn: ({ id, data }: UpdatePersonVariables) => service.update(id, data),
        onSuccess: (_data: PersonDto, variables: UpdatePersonVariables) => {
            queryClient.invalidateQueries({ queryKey: ['persons'] })
            queryClient.invalidateQueries({ queryKey: ['persons', variables.id] })
        },
    })
}
