import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EquipmentService } from './service'

const service = new EquipmentService()

export function useRegisterEquipment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: service.register.bind(service),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['equipment'], exact: false })
        },
    })
}
