import { Service, type PersonDto } from '@/shared/api/generated/__swagger_client'

export class StaffService {
    async search(params: {
        personnelNumber?: string
        page?: number
        size?: number
    }): Promise<any> {
        return Service.searchPersonsPage(
            params.personnelNumber,
            params.page?.toString(),
            params.size?.toString()
        )
    }

    async get(id: string): Promise<PersonDto> {
        return Service.getPersonById(id)
    }

    async remove(id: string): Promise<void> {
        return Service.deletePerson(id)
    }
}
