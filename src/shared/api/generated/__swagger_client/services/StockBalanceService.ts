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
     * Возвращает список текущих остатков ВИ по выбранному складу.
     * Может использоваться для:
     * - обзора общей обеспеченности склада;
     * - подготовки инвентаризации;
     * - анализа свободных и зарезервированных остатков.
     *
     * В каждой строке отчёта указываются:
     * - склад и (при наличии) зона/ячейка;
     * - номенклатура;
     * - общее количество;
     * - зарезервированное количество.
     *
     * @param warehouseId UUID склада, для которого требуется получить остатки
     * @returns StockBalanceDto Остатки по складу успешно получены
     * @throws ApiError
     */
    public static getByWarehouse(
        warehouseId: string,
    ): CancelablePromise<Array<StockBalanceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stock/balances/by-warehouse/{warehouseId}',
            path: {
                'warehouseId': warehouseId,
            },
            errors: {
                403: `Нет прав доступа к просмотру остатков склада`,
            },
        });
    }
    /**
     * Список остатков по ячейке склада
     * Возвращает список текущих остатков ВИ по конкретной ячейке склада.
     * Удобно использовать для:
     * - детального просмотра содержимого ячейки;
     * - настройки адресного хранения;
     * - анализа правильности размещения номенклатуры.
     *
     * В каждой записи содержится информация о номенклатуре и количестве,
     * размещённом в указанной ячейке.
     *
     * @param cellId UUID ячейки склада, по которой запрашиваются остатки
     * @returns StockBalanceDto Остатки по ячейке успешно получены
     * @throws ApiError
     */
    public static getByCell(
        cellId: string,
    ): CancelablePromise<Array<StockBalanceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stock/balances/by-cell/{cellId}',
            path: {
                'cellId': cellId,
            },
            errors: {
                403: `Нет прав доступа к просмотру остатков по ячейке`,
            },
        });
    }
}
