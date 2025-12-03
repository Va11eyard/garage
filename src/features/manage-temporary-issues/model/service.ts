import { Service, type TemporaryIssueDocumentDto, type TemporaryIssueCreateRequest, type TemporaryIssueUpdateRequest, type PageTemporaryIssueDocumentDto } from '@/shared/api/generated/__swagger_client'

export class TemporaryIssueService {
    async searchByWarehouse(params: {
        warehouseId: string
        from?: string
        to?: string
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED'
        page?: number
        size?: number
    }): Promise<PageTemporaryIssueDocumentDto> {
        return Service.searchTemporaryIssueDocumentsByWarehousePage(
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
    }): Promise<PageTemporaryIssueDocumentDto> {
        return Service.searchTemporaryIssueDocumentsByEmployeePage(
            params.employeeId,
            params.from,
            params.to,
            params.page,
            params.size
        )
    }

    async get(id: string): Promise<TemporaryIssueDocumentDto> {
        return Service.getTemporaryIssueDocumentById(id)
    }

    async create(data: TemporaryIssueCreateRequest): Promise<TemporaryIssueDocumentDto> {
        return Service.createTemporaryIssueDocument(data)
    }

    async update(id: string, data: TemporaryIssueUpdateRequest): Promise<TemporaryIssueDocumentDto> {
        return Service.updateTemporaryIssueDocument(id, data)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteTemporaryIssueDocument(id)
    }

    async post(id: string): Promise<TemporaryIssueDocumentDto> {
        return Service.postTemporaryIssueDocument(id)
    }

    async cancel(id: string): Promise<TemporaryIssueDocumentDto> {
        return Service.cancelTemporaryIssueDocument(id)
    }
}
