/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WriteOffLineCreateRequest } from './WriteOffLineCreateRequest';
export type WriteOffCreateRequest = {
    docNumber?: string;
    docDate?: string;
    organizationId?: string;
    warehouseId?: string;
    reason?: string;
    lines?: Array<WriteOffLineCreateRequest>;
};

