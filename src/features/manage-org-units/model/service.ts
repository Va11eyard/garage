import {
    Service,
    type OrgUnitDto,
    type OrgUnitCreateRequest,
    type OrgUnitUpdateRequest,
} from '@/shared/api/generated/__swagger_client'

export class OrgUnitService {
    async listByOrganization(orgId: string): Promise<OrgUnitDto[]> {
        return Service.listByOrganization1(orgId)
    }

    async search(params: {
        code?: string
        name?: string
        orgId?: string
        type?: string
        page?: number
        size?: number
    }) {
        return Service.search7(params.code, params.name, params.orgId, params.type, params.page, params.size)
    }

    async get(id: string): Promise<OrgUnitDto> {
        return Service.get6(id)
    }

    async create(data: OrgUnitCreateRequest): Promise<OrgUnitDto> {
        return Service.create7(data)
    }

    async update(id: string, data: OrgUnitUpdateRequest): Promise<OrgUnitDto> {
        return Service.update6(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.delete6(id)
    }
}
