import {
    Service,
    type UnitOfMeasureDto,
    type UnitOfMeasureCreateRequest,
    type UnitOfMeasureUpdateRequest,
    type PageUnitOfMeasureDto,
} from '@/shared/api/generated/__swagger_client'

export class UnitOfMeasureService {
    async list(): Promise<UnitOfMeasureDto[]> {
        return Service.list()
    }

    async search(params: {
        code?: string
        name?: string
        page?: number
        size?: number
    }): Promise<PageUnitOfMeasureDto> {
        return Service.search2(params.code, params.name, params.page, params.size)
    }

    async get(id: string): Promise<UnitOfMeasureDto> {
        return Service.get3(id)
    }

    async create(data: UnitOfMeasureCreateRequest): Promise<UnitOfMeasureDto> {
        return Service.create4(data)
    }

    async update(id: string, data: UnitOfMeasureUpdateRequest): Promise<UnitOfMeasureDto> {
        return Service.update3(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.delete3(id)
    }
}
