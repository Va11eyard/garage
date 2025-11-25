/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProvisionNormLineRequest } from './ProvisionNormLineRequest';
export type ProvisionNormCreateRequest = {
    code: string;
    name: string;
    organizationId?: string;
    employeeCategory?: string;
    gender?: string;
    season: ProvisionNormCreateRequest.season;
    priority?: number;
    description?: string;
    active?: boolean;
    lines: Array<ProvisionNormLineRequest>;
};
export namespace ProvisionNormCreateRequest {
    export enum season {
        ALL = 'ALL',
        SUMMER = 'SUMMER',
        WINTER = 'WINTER',
        DEMISEASON = 'DEMISEASON',
    }
}

