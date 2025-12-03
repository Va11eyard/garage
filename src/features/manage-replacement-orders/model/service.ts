import { Service, type ReplacementOrderDto, type ReplacementOrderCreateRequest, type ReplacementOrderUpdateRequest, type Pageable } from '@/shared/api/generated/__swagger_client'

export class ReplacementOrderService {
    async get(id: string): Promise<ReplacementOrderDto> {
        return Service.getReplacementOrderById(id)
    }

    async create(data: ReplacementOrderCreateRequest): Promise<ReplacementOrderDto> {
        return Service.createReplacementOrder(data)
    }

    async update(id: string, data: ReplacementOrderUpdateRequest): Promise<ReplacementOrderDto> {
        return Service.updateReplacementOrder(id, data)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteReplacementOrder(id)
    }

    async post(id: string): Promise<ReplacementOrderDto> {
        return Service.postReplacementOrder(id)
    }

    async cancel(id: string): Promise<ReplacementOrderDto> {
        return Service.cancelReplacementOrder(id)
    }

    async searchByWarehouse(warehouseId: string, pageable: Pageable) {
        return Service.searchReplacementOrdersByWarehouse(warehouseId, pageable)
    }

    async searchByEmployee(employeeId: string, pageable: Pageable) {
        return Service.searchReplacementOrdersByEmployee(employeeId, pageable)
    }
}
