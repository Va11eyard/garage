/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmployeeProvisionItemRowDto } from './EmployeeProvisionItemRowDto';
export type EmployeeProvisionCardDto = {
    employeeId?: string;
    personnelNumber?: string;
    lastName?: string;
    firstName?: string;
    middleName?: string;
    organizationId?: string;
    organizationName?: string;
    orgUnitId?: string;
    orgUnitName?: string;
    employeeCategory?: string;
    gender?: string;
    normId?: string;
    normCode?: string;
    normName?: string;
    season?: EmployeeProvisionCardDto.season;
    normPriority?: number;
    items?: Array<EmployeeProvisionItemRowDto>;
};
export namespace EmployeeProvisionCardDto {
    export enum season {
        ALL = 'ALL',
        SUMMER = 'SUMMER',
        WINTER = 'WINTER',
        DEMISEASON = 'DEMISEASON',
    }
}

