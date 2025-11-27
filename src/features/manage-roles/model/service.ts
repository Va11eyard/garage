import { Service, type RoleDto } from '@/shared/api/generated/__swagger_client'

export class RoleService {
    async list(): Promise<RoleDto[]> {
        return Service.list10()
    }

    async create(code: string): Promise<RoleDto> {
        return Service.create27(code)
    }
}
