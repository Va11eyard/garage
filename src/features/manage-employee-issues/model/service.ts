import {
    Service,
    type EmployeeIssueDocumentDto,
    type EmployeeIssueDocumentCreateRequest,
    type PageEmployeeIssueDocumentDto,
} from '@/shared/api/generated/__swagger_client'

export class EmployeeIssueService {
    async search(params: {
        organizationId: string
        from?: string
        to?: string
        page?: number
        size?: number
    }): Promise<PageEmployeeIssueDocumentDto> {
        return Service.searchEmployeeIssueDocumentsPage(
            params.organizationId,
            params.from,
            params.to,
            params.page,
            params.size
        )
    }

    async get(id: string): Promise<EmployeeIssueDocumentDto> {
        return Service.getEmployeeIssueDocumentById(id)
    }

    async createDraft(data: EmployeeIssueDocumentCreateRequest): Promise<EmployeeIssueDocumentDto> {
        return Service.createEmployeeIssueDocumentDraft(data)
    }

    async post(id: string): Promise<EmployeeIssueDocumentDto> {
        return Service.postEmployeeIssueDocument(id)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteEmployeeIssueDocument(id)
    }
}
