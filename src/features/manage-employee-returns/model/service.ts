import {
    Service,
    type EmployeeReturnDocumentDto,
    type EmployeeReturnDocumentCreateRequest,
    type PageEmployeeReturnDocumentDto,
} from '@/shared/api/generated/__swagger_client'

export class EmployeeReturnService {
    async search(params: {
        organizationId: string
        from?: string
        to?: string
        page?: number
        size?: number
    }): Promise<PageEmployeeReturnDocumentDto> {
        return Service.searchEmployeeReturnDocumentsPage(
            params.organizationId,
            params.from,
            params.to,
            params.page,
            params.size
        )
    }

    async get(id: string): Promise<EmployeeReturnDocumentDto> {
        return Service.getEmployeeReturnDocumentById(id)
    }

    async createDraft(data: EmployeeReturnDocumentCreateRequest): Promise<EmployeeReturnDocumentDto> {
        return Service.createEmployeeReturnDocumentDraft(data)
    }

    async post(id: string): Promise<EmployeeReturnDocumentDto> {
        return Service.postEmployeeReturnDocument(id)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteEmployeeReturnDocument(id)
    }
}
