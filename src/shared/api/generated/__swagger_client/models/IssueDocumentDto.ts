/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IssueLineDto } from './IssueLineDto';
export type IssueDocumentDto = {
    id?: string;
    docNumber?: string;
    docDate?: string;
    organizationId?: string;
    organizationName?: string;
    warehouseId?: string;
    warehouseName?: string;
    employeeId?: string;
    employeeFullName?: string;
    employeePosition?: string;
    employeeCategory?: string;
    status?: IssueDocumentDto.status;
    comment?: string;
    lines?: Array<IssueLineDto>;
};
export namespace IssueDocumentDto {
    export enum status {
        DRAFT = 'DRAFT',
        POSTED = 'POSTED',
        CANCELLED = 'CANCELLED',
    }
}

