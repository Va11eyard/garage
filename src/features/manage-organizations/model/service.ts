import { Service, type OrganizationDto, type OrganizationCreateRequest, type OrganizationUpdateRequest, type PageOrganizationDto } from '@/shared/api/generated/__swagger_client'

export class OrganizationService {
    async list(): Promise<OrganizationDto[]> {
        return Service.list2()
    }

    async search(params: { code?: string; name?: string; page?: number; size?: number }): Promise<PageOrganizationDto> {
        return Service.search2(params.code, params.name, params.page, params.size)
    }

    async get(id: string): Promise<OrganizationDto> {
        return Service.get5(id)
    }

    async create(data: OrganizationCreateRequest): Promise<OrganizationDto> {
        return Service.create5(data)
    }

    async update(id: string, data: OrganizationUpdateRequest): Promise<OrganizationDto> {
        return Service.update5(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.delete5(id)
    }
}
