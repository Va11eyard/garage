'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service, type PersonCreateRequest, type PersonDto } from '@/shared/api/generated/__swagger_client'

export function useCreateStaff() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<PersonDto, Error, PersonCreateRequest>({
        mutationFn: (data: PersonCreateRequest) => Service.createPerson(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['persons'], exact: false })
            router.refresh()
        },
    })
}
