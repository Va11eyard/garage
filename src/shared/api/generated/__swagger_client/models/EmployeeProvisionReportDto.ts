/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmployeeProvisionItemStatusDto } from './EmployeeProvisionItemStatusDto';
export type EmployeeProvisionReportDto = {
    employeeId?: string;
    employeeLastName?: string;
    employeeFirstName?: string;
    employeeMiddleName?: string;
    organizationId?: string;
    organizationName?: string;
    normId?: string;
    normCode?: string;
    normName?: string;
    employeeCategory?: string;
    season?: EmployeeProvisionReportDto.season;
    items?: Array<EmployeeProvisionItemStatusDto>;
};
export namespace EmployeeProvisionReportDto {
    export enum season {
        ALL = 'ALL',
        SUMMER = 'SUMMER',
        WINTER = 'WINTER',
        DEMISEASON = 'DEMISEASON',
    }
}

