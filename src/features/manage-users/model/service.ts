import {
    Service,
    type UserDto,
    type CreateUserRequest,
    type UpdateUserRequest,
    type PageUserDto,
} from '@/shared/api/generated/__swagger_client'

export class UserService {
    async list(): Promise<UserDto[]> {
        return Service.list5()
    }

    async search(params: {
        username?: string
        roles?: string[]
        page?: number
        size?: number
    }): Promise<PageUserDto> {
        return Service.search9(params.username, params.roles, params.page, params.size)
    }

    async get(id: string): Promise<UserDto> {
        return Service.get18(id)
    }

    async create(data: CreateUserRequest): Promise<UserDto> {
        return Service.create18(data)
    }

    async update(id: string, data: UpdateUserRequest): Promise<UserDto> {
        return Service.update18(id, data)
    }

    async restore(id: string): Promise<UserDto> {
        return Service.restore(id)
    }

    async remove(id: string): Promise<void> {
        return Service.delete18(id)
    }
}