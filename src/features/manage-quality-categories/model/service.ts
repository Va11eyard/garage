import {
    Service,
    type QualityCategoryDto,
    type QualityCategoryCreateRequest,
    type QualityCategoryUpdateRequest,
    type PageQualityCategoryDto,
} from '@/shared/api/generated/__swagger_client'

export class QualityCategoryService {
    async list(): Promise<QualityCategoryDto[]> {
        return Service.list2()
    }

    async search(params: {
        q?: string
        page?: number
        size?: number
    }): Promise<PageQualityCategoryDto> {
        return Service.search3(params.q, params.page, params.size)
    }

    async get(id: string): Promise<QualityCategoryDto> {
        return Service.get4(id)
    }

    async create(data: QualityCategoryCreateRequest): Promise<QualityCategoryDto> {
        return Service.create5(data)
    }

    async update(id: string, data: QualityCategoryUpdateRequest): Promise<QualityCategoryDto> {
        return Service.update4(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.delete4(id)
    }
}
