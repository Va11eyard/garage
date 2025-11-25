/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StockBalanceDto } from '../models/StockBalanceDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StockBalanceService {
    /**
     * Список остатков по складу
     * Возвращает список текущих остатков по выбранному складу.
     * В ответе для каждой строки указаны склад, зона (если есть),
     * ячейка (если есть), номенклатура, количество и зарезервированное количество.
     *
     * @param warehouseId Идентификатор склада
     * @returns StockBalanceDto Остатки найдены
     * @throws ApiError
     */
    public static getByWarehouse(
        warehouseId: string,
    ): CancelablePromise<StockBalanceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stock/balances/by-warehouse/{warehouseId}',
            path: {
                'warehouseId': warehouseId,
            },
            errors: {
                403: `Нет прав доступа`,
            },
        });
    }
    /**
     * Список остатков по ячейке склада
     * Возвращает список текущих остатков по конкретной ячейке склада.
     * Удобно использовать для детального просмотра содержимого ячейки.
     *
     * @param cellId Идентификатор ячейки склада
     * @returns StockBalanceDto Остатки найдены
     * @throws ApiError
     */
    public static getByCell(
        cellId: string,
    ): CancelablePromise<StockBalanceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stock/balances/by-cell/{cellId}',
            path: {
                'cellId': cellId,
            },
            errors: {
                403: `Нет прав доступа`,
            },
        });
    }
}
