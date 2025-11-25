/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CategoryChangeLineRequest = {
    warehouseZoneId?: string;
    warehouseCellId?: string;
    itemId: string;
    quantity: number;
    oldCategory?: string;
    newCategory: string;
    reason?: string;
};

