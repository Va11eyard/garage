import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import type { PersonCreateRequest } from '@/shared/api/generated/__swagger_client'

export function useCreatePerson() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: PersonCreateRequest) => Service.create13(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['persons'] })
        },
    })
}
