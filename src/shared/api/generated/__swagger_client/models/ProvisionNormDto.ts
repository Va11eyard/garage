/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProvisionNormLineDto } from './ProvisionNormLineDto';
export type ProvisionNormDto = {
    id?: string;
    code?: string;
    name?: string;
    organizationId?: string;
    organizationName?: string;
    employeeCategory?: string;
    gender?: string;
    season?: ProvisionNormDto.season;
    priority?: number;
    description?: string;
    active?: boolean;
    lines?: Array<ProvisionNormLineDto>;
};
export namespace ProvisionNormDto {
    export enum season {
        ALL = 'ALL',
        SUMMER = 'SUMMER',
        WINTER = 'WINTER',
        DEMISEASON = 'DEMISEASON',
    }
}

