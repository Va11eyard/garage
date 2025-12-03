import {
    Service,
    type EmployeeCategoryDto,
    type EmployeeCategoryCreateRequest,
    type EmployeeCategoryUpdateRequest,
} from '@/shared/api/generated/__swagger_client'

export class EmployeeCategoryService {
    async list(): Promise<EmployeeCategoryDto[]> {
        return Service.listEmployeeCategories()
    }

    async get(id: string): Promise<EmployeeCategoryDto> {
        return Service.getEmployeeCategoryById(id)
    }

    async create(data: EmployeeCategoryCreateRequest): Promise<EmployeeCategoryDto> {
        return Service.createEmployeeCategory(data)
    }

    async update(id: string, data: EmployeeCategoryUpdateRequest): Promise<EmployeeCategoryDto> {
        return Service.updateEmployeeCategory(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.deleteEmployeeCategory(id)
    }
}
