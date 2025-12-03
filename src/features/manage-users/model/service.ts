import {
    Service,
    type UserDto,
    type CreateUserRequest,
    type UpdateUserRequest,
    type PageUserDto,
} from '@/shared/api/generated/__swagger_client'

export class UserService {
    async list(): Promise<UserDto[]> {
        return Service.adminListUsers()
    }

    async search(
        username?: string,
        roles?: string[],
        page?: number,
        size?: number
    ): Promise<PageUserDto> {
        return Service.adminSearchUsersPage(username, roles, page, size)
    }

    async get(id: string): Promise<UserDto> {
        return Service.adminGetUserById(id)
    }

    async create(data: CreateUserRequest): Promise<UserDto> {
        return Service.adminCreateUser(data)
    }

    async update(id: string, data: UpdateUserRequest): Promise<UserDto> {
        return Service.adminUpdateUser(id, data)
    }

    async restore(id: string): Promise<UserDto> {
        return Service.adminRestoreUser(id)
    }

    async delete(id: string): Promise<void> {
        return Service.adminSoftDeleteUser(id)
    }
}