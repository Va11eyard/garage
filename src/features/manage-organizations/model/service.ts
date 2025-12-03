import { Service, type OrganizationDto, type OrganizationCreateRequest, type OrganizationUpdateRequest, type PageOrganizationDto } from '@/shared/api/generated/__swagger_client'

export class OrganizationService {
    async list(): Promise<OrganizationDto[]> {
        return Service.listOrganizations()
    }

    async search(params: { code?: string; name?: string; page?: number; size?: number }): Promise<PageOrganizationDto> {
        return Service.searchOrganizationsPage(params.code, params.name, params.page, params.size)
    }

    async get(id: string): Promise<OrganizationDto> {
        return Service.getOrganizationById(id)
    }

    async create(data: OrganizationCreateRequest): Promise<OrganizationDto> {
        return Service.createOrganization(data)
    }

    async update(id: string, data: OrganizationUpdateRequest): Promise<OrganizationDto> {
        return Service.updateOrganization(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.deleteOrganization(id)
    }
}
