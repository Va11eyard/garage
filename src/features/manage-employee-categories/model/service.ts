import {
    Service,
    type EmployeeCategoryDto,
    type EmployeeCategoryCreateRequest,
    type EmployeeCategoryUpdateRequest,
} from '@/shared/api/generated/__swagger_client'

export class EmployeeCategoryService {
    async list(): Promise<EmployeeCategoryDto[]> {
        return Service.list5()
    }

    async get(id: string): Promise<EmployeeCategoryDto> {
        return Service.get10(id)
    }

    async create(data: EmployeeCategoryCreateRequest): Promise<EmployeeCategoryDto> {
        return Service.create11(data)
    }

    async update(id: string, data: EmployeeCategoryUpdateRequest): Promise<EmployeeCategoryDto> {
        return Service.update10(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.delete10(id)
    }
}
