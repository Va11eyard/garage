/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Warehouse } from './Warehouse';
export type Device = {
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
    deleted?: boolean;
    deletedAt?: string;
    deletedBy?: string;
    id?: string;
    code?: string;
    name?: string;
    type?: Device.type;
    status?: Device.status;
    warehouse?: Warehouse;
    location?: string;
    lastHeartbeat?: string;
    lastError?: string;
};
export namespace Device {
    export enum type {
        BARCODE_SCANNER = 'BARCODE_SCANNER',
        RFID_READER = 'RFID_READER',
        GATE_CONTROLLER = 'GATE_CONTROLLER',
        CCTV_CAMERA = 'CCTV_CAMERA',
        TERMINAL = 'TERMINAL',
    }
    export enum status {
        NOT_CONFIGURED = 'NOT_CONFIGURED',
        INACTIVE = 'INACTIVE',
        ONLINE = 'ONLINE',
        OFFLINE = 'OFFLINE',
        ERROR = 'ERROR',
    }
}

