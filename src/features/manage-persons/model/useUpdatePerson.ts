'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { PersonUpdateRequest, PersonDto } from '@/shared/api/generated/__swagger_client'
import { PersonService } from './service'

const service = new PersonService()

type UpdatePersonVariables = {
    id: string
    data: PersonUpdateRequest
}

export function useUpdatePerson() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<PersonDto, Error, UpdatePersonVariables>({
        mutationFn: ({ id, data }: UpdatePersonVariables) => service.update(id, data),
        onSuccess: async (_data: PersonDto, variables: UpdatePersonVariables) => {
            await queryClient.refetchQueries({ queryKey: ['persons'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['persons'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['persons', variables.id], exact: false })
            router.refresh()
        },
    })
}
