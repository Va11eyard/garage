import { Service, type ReturnDocumentDto, type ReturnCreateRequest, type ReturnUpdateRequest, type PageReturnDocumentDto } from '@/shared/api/generated/__swagger_client'

export class ReturnService {
    async searchByWarehouse(params: {
        warehouseId: string
        from?: string
        to?: string
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED'
        page?: number
        size?: number
    }): Promise<PageReturnDocumentDto> {
        return Service.searchReturnDocumentsByWarehousePage(
            params.warehouseId,
            params.from,
            params.to,
            params.status,
            params.page,
            params.size
        )
    }

    async searchByEmployee(params: {
        employeeId: string
        from?: string
        to?: string
        page?: number
        size?: number
    }): Promise<PageReturnDocumentDto> {
        return Service.searchReturnDocumentsByEmployeePage(
            params.employeeId,
            params.from,
            params.to,
            params.page,
            params.size
        )
    }

    async get(id: string): Promise<ReturnDocumentDto> {
        return Service.getReturnDocumentById(id)
    }

    async create(data: ReturnCreateRequest): Promise<ReturnDocumentDto> {
        return Service.createReturnDocument(data)
    }

    async update(id: string, data: ReturnUpdateRequest): Promise<ReturnDocumentDto> {
        return Service.updateReturnDocument(id, data)
    }

    async post(id: string): Promise<ReturnDocumentDto> {
        return Service.postReturnDocument(id)
    }

    async cancel(id: string): Promise<ReturnDocumentDto> {
        return Service.cancelReturnDocument(id)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteReturnDocument(id)
    }
}
