import { Service, type RoleDto } from '@/shared/api/generated/__swagger_client'

export class RoleService {
    async list(): Promise<RoleDto[]> {
        return Service.list9()
    }

    async create(data: { code: string; name: string; description?: string }): Promise<RoleDto> {
        return Service.create27(data.code, data.name, data.description)
    }
}
