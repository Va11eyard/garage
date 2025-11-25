/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TemporaryIssueLineDto } from './TemporaryIssueLineDto';
export type TemporaryIssueDocumentDto = {
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
    plannedReturnDate?: string;
    status?: TemporaryIssueDocumentDto.status;
    lines?: Array<TemporaryIssueLineDto>;
};
export namespace TemporaryIssueDocumentDto {
    export enum status {
        DRAFT = 'DRAFT',
        POSTED = 'POSTED',
        CANCELLED = 'CANCELLED',
    }
}

