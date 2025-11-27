import { Service, type IssueDocumentDto, type IssueCreateRequest, type IssueUpdateRequest, type PageIssueDocumentDto } from '@/shared/api/generated/__swagger_client'

export class IssueService {
    async searchByWarehouse(params: {
        warehouseId: string
        from?: string
        to?: string
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED'
        page?: number
        size?: number
    }): Promise<PageIssueDocumentDto> {
        return Service.searchByWarehouse4(
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
    }): Promise<PageIssueDocumentDto> {
        return Service.searchByEmployee3(
            params.employeeId,
            params.from,
            params.to,
            params.page,
            params.size
        )
    }

    async get(id: string): Promise<IssueDocumentDto> {
        return Service.get20(id)
    }

    async create(data: IssueCreateRequest): Promise<IssueDocumentDto> {
        return Service.create23(data)
    }

    async update(id: string, data: IssueUpdateRequest): Promise<IssueDocumentDto> {
        return Service.update20(id, data)
    }

    async post(id: string): Promise<IssueDocumentDto> {
        return Service.post10(id)
    }

    async cancel(id: string): Promise<IssueDocumentDto> {
        return Service.cancel6(id)
    }

    async remove(id: string): Promise<void> {
        return Service.delete20(id)
    }
}
