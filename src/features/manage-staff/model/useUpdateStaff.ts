'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service, type PersonUpdateRequest, type PersonDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateStaff() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<PersonDto, Error, { id: string; data: PersonUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: PersonUpdateRequest }) => 
            Service.updatePerson(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['staff'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['staff'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['persons'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['persons'], exact: false })
            router.refresh()
        },
    })
}
