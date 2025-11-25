/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InventorySurplusLineDto } from './InventorySurplusLineDto';
export type InventorySurplusDocumentDto = {
    id?: string;
    docNumber?: string;
    docDate?: string;
    organizationId?: string;
    organizationName?: string;
    warehouseId?: string;
    warehouseName?: string;
    status?: InventorySurplusDocumentDto.status;
    comment?: string;
    lines?: Array<InventorySurplusLineDto>;
};
export namespace InventorySurplusDocumentDto {
    export enum status {
        DRAFT = 'DRAFT',
        POSTED = 'POSTED',
        CANCELLED = 'CANCELLED',
    }
}

