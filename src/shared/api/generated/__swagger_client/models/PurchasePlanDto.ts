/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PurchasePlanItemDto } from './PurchasePlanItemDto';
export type PurchasePlanDto = {
    id?: string;
    planningDate?: string;
    horizonMonths?: number;
    organizationId?: string;
    organizationName?: string;
    warehouseId?: string;
    warehouseName?: string;
    status?: PurchasePlanDto.status;
    comment?: string;
    items?: Array<PurchasePlanItemDto>;
};
export namespace PurchasePlanDto {
    export enum status {
        DRAFT = 'DRAFT',
        APPROVED = 'APPROVED',
        SENT = 'SENT',
        CLOSED = 'CLOSED',
    }
}

