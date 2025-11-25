/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QualityAcceptanceLineCreateRequest } from './QualityAcceptanceLineCreateRequest';
export type QualityAcceptanceUpdateRequest = {
    docNumber?: string;
    docDate?: string;
    organizationId?: string;
    warehouseId?: string;
    receiptDocumentId?: string;
    comment?: string;
    lines?: Array<QualityAcceptanceLineCreateRequest>;
};

