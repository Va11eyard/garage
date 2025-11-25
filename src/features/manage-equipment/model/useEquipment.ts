import { useQuery } from '@tanstack/react-query'
import { EquipmentService } from './service'

const service = new EquipmentService()

export function useEquipment() {
    return useQuery({
        queryKey: ['equipment'],
        queryFn: () => service.list(),
    })
}
