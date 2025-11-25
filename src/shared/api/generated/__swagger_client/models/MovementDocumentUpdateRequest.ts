/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MovementLineCreateRequest } from './MovementLineCreateRequest';
export type MovementDocumentUpdateRequest = {
    docNumber?: string;
    docDate?: string;
    movementType?: MovementDocumentUpdateRequest.movementType;
    fromOrganizationId?: string;
    fromWarehouseId?: string;
    toOrganizationId?: string;
    toWarehouseId?: string;
    responsibleEmployeeId?: string;
    comment?: string;
    lines?: Array<MovementLineCreateRequest>;
};
export namespace MovementDocumentUpdateRequest {
    export enum movementType {
        INTERNAL = 'INTERNAL',
        DP_TO_DP = 'DP_TO_DP',
        DP_TO_MVD = 'DP_TO_MVD',
    }
}

