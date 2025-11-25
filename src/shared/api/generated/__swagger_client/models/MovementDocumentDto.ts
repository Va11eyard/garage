/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MovementLineDto } from './MovementLineDto';
export type MovementDocumentDto = {
    id?: string;
    docNumber?: string;
    docDate?: string;
    movementType?: MovementDocumentDto.movementType;
    status?: MovementDocumentDto.status;
    fromOrganizationId?: string;
    fromOrganizationName?: string;
    fromWarehouseId?: string;
    fromWarehouseName?: string;
    toOrganizationId?: string;
    toOrganizationName?: string;
    toWarehouseId?: string;
    toWarehouseName?: string;
    responsibleEmployeeId?: string;
    responsibleEmployeeFullName?: string;
    comment?: string;
    lines?: Array<MovementLineDto>;
};
export namespace MovementDocumentDto {
    export enum movementType {
        INTERNAL = 'INTERNAL',
        DP_TO_DP = 'DP_TO_DP',
        DP_TO_MVD = 'DP_TO_MVD',
    }
    export enum status {
        DRAFT = 'DRAFT',
        POSTED = 'POSTED',
        CANCELLED = 'CANCELLED',
    }
}

