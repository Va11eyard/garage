import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { PersonCreateRequest } from '@/shared/api/generated/__swagger_client'
import { PersonService } from './service'

const service = new PersonService()

export function useCreatePerson() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: PersonCreateRequest) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['persons'], exact: false })
        },
    })
}
