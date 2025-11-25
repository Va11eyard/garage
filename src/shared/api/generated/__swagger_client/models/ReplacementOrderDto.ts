/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReplacementOrderLineDto } from './ReplacementOrderLineDto';
export type ReplacementOrderDto = {
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
    status?: ReplacementOrderDto.status;
    lines?: Array<ReplacementOrderLineDto>;
};
export namespace ReplacementOrderDto {
    export enum status {
        DRAFT = 'DRAFT',
        POSTED = 'POSTED',
        CANCELLED = 'CANCELLED',
    }
}

