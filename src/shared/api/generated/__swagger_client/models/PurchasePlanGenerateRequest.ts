/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PurchasePlanGenerateRequest = {
    organizationId?: string;
    warehouseId?: string;
    horizonMonths: number;
    employeeCategory?: string;
    season?: PurchasePlanGenerateRequest.season;
    comment?: string;
};
export namespace PurchasePlanGenerateRequest {
    export enum season {
        ALL = 'ALL',
        SUMMER = 'SUMMER',
        WINTER = 'WINTER',
        DEMISEASON = 'DEMISEASON',
    }
}

