/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EmployeeStatusEventDto = {
    id?: string;
    eventType?: EmployeeStatusEventDto.eventType;
    eventDate?: string;
    organizationId?: string;
    organizationName?: string;
    orgUnitId?: string;
    orgUnitName?: string;
    positionName?: string;
    rankName?: string;
    comment?: string;
    active?: boolean;
};
export namespace EmployeeStatusEventDto {
    export enum eventType {
        HIRED = 'HIRED',
        TRANSFERRED = 'TRANSFERRED',
        DISMISSED = 'DISMISSED',
    }
}

