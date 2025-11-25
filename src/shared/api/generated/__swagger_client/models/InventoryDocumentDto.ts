/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InventoryLineDto } from './InventoryLineDto';
export type InventoryDocumentDto = {
    id?: string;
    docNumber?: string;
    docDate?: string;
    status?: InventoryDocumentDto.status;
    organizationId?: string;
    organizationName?: string;
    warehouseId?: string;
    warehouseName?: string;
    responsibleEmployeeId?: string;
    responsibleEmployeeFullName?: string;
    comment?: string;
    lines?: Array<InventoryLineDto>;
};
export namespace InventoryDocumentDto {
    export enum status {
        DRAFT = 'DRAFT',
        POSTED = 'POSTED',
        CANCELLED = 'CANCELLED',
    }
}

