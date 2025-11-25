/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AdminSearchResultDto = {
    id?: string;
    type?: AdminSearchResultDto.type;
    title?: string;
    subtitle?: string;
    details?: string;
};
export namespace AdminSearchResultDto {
    export enum type {
        ORGANIZATION = 'ORGANIZATION',
        WAREHOUSE = 'WAREHOUSE',
        ITEM = 'ITEM',
        EMPLOYEE = 'EMPLOYEE',
    }
}

