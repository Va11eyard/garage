/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReceiptLineDto } from './ReceiptLineDto';
export type ReceiptDocumentDto = {
    id?: string;
    docNumber?: string;
    docDate?: string;
    organizationId?: string;
    organizationName?: string;
    warehouseId?: string;
    warehouseName?: string;
    supplierName?: string;
    status?: ReceiptDocumentDto.status;
    comment?: string;
    lines?: Array<ReceiptLineDto>;
};
export namespace ReceiptDocumentDto {
    export enum status {
        DRAFT = 'DRAFT',
        POSTED = 'POSTED',
        CANCELLED = 'CANCELLED',
    }
}

