/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReturnLineDto } from './ReturnLineDto';
export type ReturnDocumentDto = {
    id?: string;
    docNumber?: string;
    docDate?: string;
    organizationId?: string;
    organizationName?: string;
    warehouseId?: string;
    warehouseName?: string;
    employeeId?: string;
    employeeFullName?: string;
    reason?: string;
    status?: ReturnDocumentDto.status;
    lines?: Array<ReturnLineDto>;
};
export namespace ReturnDocumentDto {
    export enum status {
        DRAFT = 'DRAFT',
        POSTED = 'POSTED',
        CANCELLED = 'CANCELLED',
    }
}

