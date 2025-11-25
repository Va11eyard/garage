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
        return Service.searchByWarehouse2(
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
        return Service.searchByEmployee1(
            params.employeeId,
            params.from,
            params.to,
            params.page,
            params.size
        )
    }

    async get(id: string): Promise<ReturnDocumentDto> {
        return Service.get12(id)
    }

    async create(data: ReturnCreateRequest): Promise<ReturnDocumentDto> {
        return Service.create12(data)
    }

    async update(id: string, data: ReturnUpdateRequest): Promise<ReturnDocumentDto> {
        return Service.update12(id, data)
    }

    async post(id: string): Promise<ReturnDocumentDto> {
        return Service.post2(id)
    }

    async cancel(id: string): Promise<ReturnDocumentDto> {
        return Service.cancel2(id)
    }

    async remove(id: string): Promise<void> {
        return Service.delete12(id)
    }
}
