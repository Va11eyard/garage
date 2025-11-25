/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QualityAcceptanceLineDto } from './QualityAcceptanceLineDto';
export type QualityAcceptanceDocumentDto = {
    id?: string;
    docNumber?: string;
    docDate?: string;
    organizationId?: string;
    organizationName?: string;
    warehouseId?: string;
    warehouseName?: string;
    receiptDocumentId?: string;
    status?: QualityAcceptanceDocumentDto.status;
    comment?: string;
    lines?: Array<QualityAcceptanceLineDto>;
};
export namespace QualityAcceptanceDocumentDto {
    export enum status {
        DRAFT = 'DRAFT',
        POSTED = 'POSTED',
        CANCELLED = 'CANCELLED',
    }
}

