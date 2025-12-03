/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SystemJobInfoDto } from '../models/SystemJobInfoDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StubService {
    /**
     * Ручной запуск регламентной задачи (stub)
     * @param code
     * @returns any OK
     * @throws ApiError
     */
    public static adminRunSystemJob(
        code: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/system/jobs/{code}/run',
            path: {
                'code': code,
            },
        });
    }
    /**
     * Запрос на восстановление из бэкапа (stub)
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static adminRequestBackupImport(
        requestBody?: {
            file: Blob;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/system/backup/import',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Запрос на резервное копирование (stub)
     * @returns string OK
     * @throws ApiError
     */
    public static adminRequestBackupExport(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/system/backup/export',
        });
    }
    /**
     * Список регламентных задач (stub)
     * @returns SystemJobInfoDto OK
     * @throws ApiError
     */
    public static adminListSystemJobs(): CancelablePromise<Array<SystemJobInfoDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/system/jobs',
        });
    }
}
