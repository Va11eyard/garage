/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminSearchResultDto } from '../models/AdminSearchResultDto';
import type { CategoryChangeDocumentCreateRequest } from '../models/CategoryChangeDocumentCreateRequest';
import type { CategoryChangeDocumentDto } from '../models/CategoryChangeDocumentDto';
import type { ConsolidatedDashboardDto } from '../models/ConsolidatedDashboardDto';
import type { CreateUserRequest } from '../models/CreateUserRequest';
import type { Device } from '../models/Device';
import type { EmployeeCategoryCreateRequest } from '../models/EmployeeCategoryCreateRequest';
import type { EmployeeCategoryDto } from '../models/EmployeeCategoryDto';
import type { EmployeeCategoryUpdateRequest } from '../models/EmployeeCategoryUpdateRequest';
import type { EmployeeDismissRequest } from '../models/EmployeeDismissRequest';
import type { EmployeeDto } from '../models/EmployeeDto';
import type { EmployeeHireRequest } from '../models/EmployeeHireRequest';
import type { EmployeeIssueDocumentCreateRequest } from '../models/EmployeeIssueDocumentCreateRequest';
import type { EmployeeIssueDocumentDto } from '../models/EmployeeIssueDocumentDto';
import type { EmployeeItemAssignmentDto } from '../models/EmployeeItemAssignmentDto';
import type { EmployeeProvisionCardDto } from '../models/EmployeeProvisionCardDto';
import type { EmployeeProvisionReportDto } from '../models/EmployeeProvisionReportDto';
import type { EmployeeReturnDocumentCreateRequest } from '../models/EmployeeReturnDocumentCreateRequest';
import type { EmployeeReturnDocumentDto } from '../models/EmployeeReturnDocumentDto';
import type { EmployeeStatusEventDto } from '../models/EmployeeStatusEventDto';
import type { EmployeeTransferRequest } from '../models/EmployeeTransferRequest';
import type { IntegrationEndpoint } from '../models/IntegrationEndpoint';
import type { IntegrationMessage } from '../models/IntegrationMessage';
import type { InventoryDocumentCreateRequest } from '../models/InventoryDocumentCreateRequest';
import type { InventoryDocumentDto } from '../models/InventoryDocumentDto';
import type { InventoryDocumentUpdateRequest } from '../models/InventoryDocumentUpdateRequest';
import type { InventorySurplusCreateRequest } from '../models/InventorySurplusCreateRequest';
import type { InventorySurplusDocumentDto } from '../models/InventorySurplusDocumentDto';
import type { InventorySurplusUpdateRequest } from '../models/InventorySurplusUpdateRequest';
import type { IssueCreateRequest } from '../models/IssueCreateRequest';
import type { IssueDocumentDto } from '../models/IssueDocumentDto';
import type { IssueUpdateRequest } from '../models/IssueUpdateRequest';
import type { ItemCreateRequest } from '../models/ItemCreateRequest';
import type { ItemDto } from '../models/ItemDto';
import type { ItemGroupCreateRequest } from '../models/ItemGroupCreateRequest';
import type { ItemGroupDto } from '../models/ItemGroupDto';
import type { ItemGroupUpdateRequest } from '../models/ItemGroupUpdateRequest';
import type { ItemSupplyNormCreateRequest } from '../models/ItemSupplyNormCreateRequest';
import type { ItemSupplyNormDto } from '../models/ItemSupplyNormDto';
import type { ItemSupplyNormUpdateRequest } from '../models/ItemSupplyNormUpdateRequest';
import type { ItemUpdateRequest } from '../models/ItemUpdateRequest';
import type { MovementDocumentCreateRequest } from '../models/MovementDocumentCreateRequest';
import type { MovementDocumentDto } from '../models/MovementDocumentDto';
import type { MovementDocumentUpdateRequest } from '../models/MovementDocumentUpdateRequest';
import type { OrganizationCreateRequest } from '../models/OrganizationCreateRequest';
import type { OrganizationDto } from '../models/OrganizationDto';
import type { OrganizationUpdateRequest } from '../models/OrganizationUpdateRequest';
import type { OrgUnitCreateRequest } from '../models/OrgUnitCreateRequest';
import type { OrgUnitDto } from '../models/OrgUnitDto';
import type { OrgUnitUpdateRequest } from '../models/OrgUnitUpdateRequest';
import type { Page } from '../models/Page';
import type { Pageable } from '../models/Pageable';
import type { PageAuditLogDto } from '../models/PageAuditLogDto';
import type { PageCategoryChangeDocumentDto } from '../models/PageCategoryChangeDocumentDto';
import type { PageEmployeeDto } from '../models/PageEmployeeDto';
import type { PageEmployeeIssueDocumentDto } from '../models/PageEmployeeIssueDocumentDto';
import type { PageEmployeeItemAssignmentDto } from '../models/PageEmployeeItemAssignmentDto';
import type { PageEmployeeReturnDocumentDto } from '../models/PageEmployeeReturnDocumentDto';
import type { PageEmployeeWearReportRowDto } from '../models/PageEmployeeWearReportRowDto';
import type { PageInventorySurplusDocumentDto } from '../models/PageInventorySurplusDocumentDto';
import type { PageIssueDocumentDto } from '../models/PageIssueDocumentDto';
import type { PageItemDto } from '../models/PageItemDto';
import type { PageItemSupplyNormDto } from '../models/PageItemSupplyNormDto';
import type { PageOrganizationDto } from '../models/PageOrganizationDto';
import type { PagePersonDto } from '../models/PagePersonDto';
import type { PageProvisionNormDto } from '../models/PageProvisionNormDto';
import type { PageQualityAcceptanceDocumentDto } from '../models/PageQualityAcceptanceDocumentDto';
import type { PageQualityCategoryDto } from '../models/PageQualityCategoryDto';
import type { PageReceiptDocumentDto } from '../models/PageReceiptDocumentDto';
import type { PageReturnDocumentDto } from '../models/PageReturnDocumentDto';
import type { PageTemporaryIssueDocumentDto } from '../models/PageTemporaryIssueDocumentDto';
import type { PageUnitOfMeasureDto } from '../models/PageUnitOfMeasureDto';
import type { PageUserDto } from '../models/PageUserDto';
import type { PageWarehouseDto } from '../models/PageWarehouseDto';
import type { PageWriteOffDocumentDto } from '../models/PageWriteOffDocumentDto';
import type { PersonCreateRequest } from '../models/PersonCreateRequest';
import type { PersonDto } from '../models/PersonDto';
import type { PersonUpdateRequest } from '../models/PersonUpdateRequest';
import type { ProvisionNormCreateRequest } from '../models/ProvisionNormCreateRequest';
import type { ProvisionNormDto } from '../models/ProvisionNormDto';
import type { ProvisionNormUpdateRequest } from '../models/ProvisionNormUpdateRequest';
import type { PurchasePlanDto } from '../models/PurchasePlanDto';
import type { PurchasePlanGenerateRequest } from '../models/PurchasePlanGenerateRequest';
import type { QualityAcceptanceCreateRequest } from '../models/QualityAcceptanceCreateRequest';
import type { QualityAcceptanceDocumentDto } from '../models/QualityAcceptanceDocumentDto';
import type { QualityAcceptanceUpdateRequest } from '../models/QualityAcceptanceUpdateRequest';
import type { QualityCategoryCreateRequest } from '../models/QualityCategoryCreateRequest';
import type { QualityCategoryDto } from '../models/QualityCategoryDto';
import type { QualityCategoryUpdateRequest } from '../models/QualityCategoryUpdateRequest';
import type { ReceiptCreateRequest } from '../models/ReceiptCreateRequest';
import type { ReceiptDocumentDto } from '../models/ReceiptDocumentDto';
import type { ReceiptUpdateRequest } from '../models/ReceiptUpdateRequest';
import type { ReplacementOrderCreateRequest } from '../models/ReplacementOrderCreateRequest';
import type { ReplacementOrderDto } from '../models/ReplacementOrderDto';
import type { ReplacementOrderUpdateRequest } from '../models/ReplacementOrderUpdateRequest';
import type { ReturnCreateRequest } from '../models/ReturnCreateRequest';
import type { ReturnDocumentDto } from '../models/ReturnDocumentDto';
import type { ReturnUpdateRequest } from '../models/ReturnUpdateRequest';
import type { RoleDto } from '../models/RoleDto';
import type { SystemSettingDto } from '../models/SystemSettingDto';
import type { SystemSettingUpsertRequest } from '../models/SystemSettingUpsertRequest';
import type { TemporaryIssueCreateRequest } from '../models/TemporaryIssueCreateRequest';
import type { TemporaryIssueDocumentDto } from '../models/TemporaryIssueDocumentDto';
import type { TemporaryIssueUpdateRequest } from '../models/TemporaryIssueUpdateRequest';
import type { UnitOfMeasureCreateRequest } from '../models/UnitOfMeasureCreateRequest';
import type { UnitOfMeasureDto } from '../models/UnitOfMeasureDto';
import type { UnitOfMeasureUpdateRequest } from '../models/UnitOfMeasureUpdateRequest';
import type { UpdateUserRequest } from '../models/UpdateUserRequest';
import type { UserDto } from '../models/UserDto';
import type { WarehouseCellCreateRequest } from '../models/WarehouseCellCreateRequest';
import type { WarehouseCellDto } from '../models/WarehouseCellDto';
import type { WarehouseCellUpdateRequest } from '../models/WarehouseCellUpdateRequest';
import type { WarehouseCreateRequest } from '../models/WarehouseCreateRequest';
import type { WarehouseDto } from '../models/WarehouseDto';
import type { WarehouseUpdateRequest } from '../models/WarehouseUpdateRequest';
import type { WarehouseZoneCreateRequest } from '../models/WarehouseZoneCreateRequest';
import type { WarehouseZoneDto } from '../models/WarehouseZoneDto';
import type { WarehouseZoneUpdateRequest } from '../models/WarehouseZoneUpdateRequest';
import type { WriteOffCreateRequest } from '../models/WriteOffCreateRequest';
import type { WriteOffDocumentDto } from '../models/WriteOffDocumentDto';
import type { WriteOffUpdateRequest } from '../models/WriteOffUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class Service {
    /**
     * Получить склад по идентификатору
     * Возвращает карточку склада по его UUID.
     * @param id UUID склада
     * @returns WarehouseDto OK
     * @throws ApiError
     */
    public static getWarehouseById(
        id: string,
    ): CancelablePromise<WarehouseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/warehouses/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить склад
     * Обновляет параметры склада: наименование, адрес, описание, привязку к подразделению и флаг активности.
     * Код склада, как правило, остаётся неизменным.
     *
     * @param id UUID склада
     * @param requestBody
     * @returns WarehouseDto OK
     * @throws ApiError
     */
    public static updateWarehouse(
        id: string,
        requestBody: WarehouseUpdateRequest,
    ): CancelablePromise<WarehouseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nsi/warehouses/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить склад
     * Выполняет soft delete склада: запись остаётся в базе, но помечается как удалённая и неактивная.
     * Такой склад не должен использоваться в новых операциях, но его история сохраняется.
     *
     * @param id UUID склада
     * @returns any OK
     * @throws ApiError
     */
    public static deleteWarehouse(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/nsi/warehouses/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить зону склада по идентификатору
     * Возвращает карточку зоны склада по её UUID.
     * @param id UUID зоны склада
     * @returns WarehouseZoneDto OK
     * @throws ApiError
     */
    public static get(
        id: string,
    ): CancelablePromise<WarehouseZoneDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/warehouse-zones/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить зону склада
     * Обновляет параметры зоны склада: наименование, порядок сортировки и флаг активности.
     * Код зоны, как правило, остаётся неизменным.
     *
     * @param id UUID зоны склада
     * @param requestBody
     * @returns WarehouseZoneDto OK
     * @throws ApiError
     */
    public static update(
        id: string,
        requestBody: WarehouseZoneUpdateRequest,
    ): CancelablePromise<WarehouseZoneDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nsi/warehouse-zones/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить зону склада
     * Выполняет soft delete зоны склада: запись остаётся в базе данных, но помечается как удалённая и неактивная.
     * В дальнейшем такая зона не должна использоваться для размещения новых товаров.
     *
     * @param id UUID зоны склада
     * @returns any OK
     * @throws ApiError
     */
    public static delete(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/nsi/warehouse-zones/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить ячейку склада по идентификатору
     * Возвращает карточку ячейки склада по её UUID.
     * @param id UUID ячейки склада
     * @returns WarehouseCellDto OK
     * @throws ApiError
     */
    public static getWarehouseCellById(
        id: string,
    ): CancelablePromise<WarehouseCellDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/warehouse-cells/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить ячейку склада
     * Обновляет параметры ячейки склада: зону, описание, вместимость и флаг активности.
     * Код ячейки, как правило, остаётся неизменным.
     *
     * @param id UUID ячейки склада
     * @param requestBody
     * @returns WarehouseCellDto OK
     * @throws ApiError
     */
    public static updateWarehouseCell(
        id: string,
        requestBody: WarehouseCellUpdateRequest,
    ): CancelablePromise<WarehouseCellDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nsi/warehouse-cells/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить ячейку склада
     * Выполняет soft delete ячейки: запись остаётся в базе данных, но помечается как удалённая и неактивная
     * и не должна использоваться для размещения товарных остатков.
     *
     * @param id UUID ячейки склада
     * @returns any OK
     * @throws ApiError
     */
    public static deleteWarehouseCell(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/nsi/warehouse-cells/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить единицу измерения по идентификатору
     * Возвращает карточку единицы измерения по её UUID.
     * @param id UUID единицы измерения
     * @returns UnitOfMeasureDto OK
     * @throws ApiError
     */
    public static getUnitOfMeasureById(
        id: string,
    ): CancelablePromise<UnitOfMeasureDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/units/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить единицу измерения
     * Обновляет наименование, краткое наименование и флаг активности единицы измерения.
     * @param id UUID единицы измерения
     * @param requestBody
     * @returns UnitOfMeasureDto OK
     * @throws ApiError
     */
    public static updateUnitOfMeasure(
        id: string,
        requestBody: UnitOfMeasureUpdateRequest,
    ): CancelablePromise<UnitOfMeasureDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nsi/units/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить единицу измерения
     * Выполняет soft delete: запись остаётся в БД, помечается как удалённая и неактивная.
     * @param id UUID единицы измерения
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUnitOfMeasure(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/nsi/units/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить категорию качественного состояния по идентификатору
     * Возвращает карточку категории качественного состояния.
     * @param id UUID категории качественного состояния
     * @returns QualityCategoryDto OK
     * @throws ApiError
     */
    public static getQualityCategoryById(
        id: string,
    ): CancelablePromise<QualityCategoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/quality-categories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить категорию качественного состояния
     * Обновляет наименование/описание/признак активности категории качественного состояния.
     * @param id UUID категории качественного состояния
     * @param requestBody
     * @returns QualityCategoryDto OK
     * @throws ApiError
     */
    public static updateQualityCategory(
        id: string,
        requestBody: QualityCategoryUpdateRequest,
    ): CancelablePromise<QualityCategoryDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nsi/quality-categories/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягкое удаление категории качественного состояния
     * Выполняет soft delete записи категории качественного состояния. Данные остаются в БД для истории.
     * @param id UUID категории качественного состояния
     * @returns any OK
     * @throws ApiError
     */
    public static deleteQualityCategory(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/nsi/quality-categories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить организацию по идентификатору
     * Возвращает карточку организации по её UUID.
     * @param id UUID организации
     * @returns OrganizationDto OK
     * @throws ApiError
     */
    public static getOrganizationById(
        id: string,
    ): CancelablePromise<OrganizationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/organizations/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить организацию
     * Обновляет наименование, краткое наименование и флаг активности организации.
     * @param id UUID организации
     * @param requestBody
     * @returns OrganizationDto OK
     * @throws ApiError
     */
    public static updateOrganization(
        id: string,
        requestBody: OrganizationUpdateRequest,
    ): CancelablePromise<OrganizationDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nsi/organizations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить организацию
     * Выполняет soft delete организации: запись остаётся в базе, но помечается как удалённая и неактивная.
     * @param id UUID организации
     * @returns any OK
     * @throws ApiError
     */
    public static deleteOrganization(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/nsi/organizations/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить подразделение по идентификатору
     * Возвращает карточку подразделения (OrgUnit) по его UUID.
     * @param id UUID подразделения
     * @returns OrgUnitDto OK
     * @throws ApiError
     */
    public static getOrgUnitById(
        id: string,
    ): CancelablePromise<OrgUnitDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/org-units/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить подразделение
     * Обновляет данные подразделения (наименование, тип, родительское подразделение, флаг активности).
     * Код подразделения, как правило, остаётся неизменным.
     *
     * @param id UUID подразделения
     * @param requestBody
     * @returns OrgUnitDto OK
     * @throws ApiError
     */
    public static updateOrgUnit(
        id: string,
        requestBody: OrgUnitUpdateRequest,
    ): CancelablePromise<OrgUnitDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nsi/org-units/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить подразделение
     * Выполняет soft delete подразделения: запись остаётся в базе данных,
     * но помечается как удалённая и неактивная, и не участвует в выборках.
     *
     * @param id UUID подразделения
     * @returns any OK
     * @throws ApiError
     */
    public static deleteOrgUnit(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/nsi/org-units/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить номенклатуру по идентификатору
     * Возвращает карточку номенклатуры по её UUID.
     * @param id UUID номенклатуры
     * @returns ItemDto OK
     * @throws ApiError
     */
    public static getItemById(
        id: string,
    ): CancelablePromise<ItemDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/items/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить номенклатуру
     * Обновляет параметры номенклатуры: наименование, группу, базовую единицу, штрих-код,
     * массу/объём и флаг активности.
     * Код номенклатуры, как правило, остаётся неизменным.
     *
     * @param id UUID номенклатуры
     * @param requestBody
     * @returns ItemDto OK
     * @throws ApiError
     */
    public static updateItem(
        id: string,
        requestBody: ItemUpdateRequest,
    ): CancelablePromise<ItemDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nsi/items/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить номенклатуру
     * Выполняет soft delete номенклатуры: запись остаётся в базе, но помечается как удалённая и неактивная.
     *
     * @param id UUID номенклатуры
     * @returns any OK
     * @throws ApiError
     */
    public static deleteItem(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/nsi/items/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить норму обеспечения по идентификатору
     * Возвращает норму обеспечения ВИ по её UUID.
     * @param id UUID нормы обеспечения
     * @returns ItemSupplyNormDto OK
     * @throws ApiError
     */
    public static getItemSupplyNormById(
        id: string,
    ): CancelablePromise<ItemSupplyNormDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/item-supply-norms/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить норму обеспечения ВИ
     * Обновляет параметры нормы: количество, срок носки, период действия, признак активности.
     * @param id UUID нормы обеспечения
     * @param requestBody
     * @returns ItemSupplyNormDto OK
     * @throws ApiError
     */
    public static updateItemSupplyNorm(
        id: string,
        requestBody: ItemSupplyNormUpdateRequest,
    ): CancelablePromise<ItemSupplyNormDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nsi/item-supply-norms/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить норму обеспечения ВИ
     * Выполняет soft delete нормы обеспечения ВИ. Используется для логического удаления.
     * @param id UUID нормы обеспечения
     * @returns any OK
     * @throws ApiError
     */
    public static deleteItemSupplyNorm(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/nsi/item-supply-norms/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить группу номенклатуры по идентификатору
     * Возвращает карточку группы номенклатуры по её UUID.
     * @param id UUID группы номенклатуры
     * @returns ItemGroupDto OK
     * @throws ApiError
     */
    public static getItemGroupById(
        id: string,
    ): CancelablePromise<ItemGroupDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/item-groups/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить группу номенклатуры
     * Обновляет наименование, родительскую группу и флаг активности.
     * Код группы, как правило, остаётся неизменным.
     *
     * @param id UUID группы номенклатуры
     * @param requestBody
     * @returns ItemGroupDto OK
     * @throws ApiError
     */
    public static updateItemGroup(
        id: string,
        requestBody: ItemGroupUpdateRequest,
    ): CancelablePromise<ItemGroupDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nsi/item-groups/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить группу номенклатуры
     * Выполняет soft delete: запись остаётся в базе данных, помечается как удалённая и неактивная.
     *
     * @param id UUID группы номенклатуры
     * @returns any OK
     * @throws ApiError
     */
    public static deleteItemGroup(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/nsi/item-groups/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить категорию сотрудников по идентификатору
     * Возвращает категорию сотрудников по её UUID.
     * @param id UUID категории сотрудников
     * @returns EmployeeCategoryDto OK
     * @throws ApiError
     */
    public static getEmployeeCategoryById(
        id: string,
    ): CancelablePromise<EmployeeCategoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/employee-categories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить категорию сотрудников
     * Обновляет наименование, описание и признак активности категории сотрудников.
     * @param id UUID категории сотрудников
     * @param requestBody
     * @returns EmployeeCategoryDto OK
     * @throws ApiError
     */
    public static updateEmployeeCategory(
        id: string,
        requestBody: EmployeeCategoryUpdateRequest,
    ): CancelablePromise<EmployeeCategoryDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nsi/employee-categories/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить категорию сотрудников
     * Выполняет soft delete категории сотрудников. Данные остаются в БД для истории.
     * @param id UUID категории сотрудников
     * @returns any OK
     * @throws ApiError
     */
    public static deleteEmployeeCategory(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/nsi/employee-categories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить норму обеспечения по идентификатору
     * Возвращает полную структуру нормы, включая строки по номенклатуре.
     * @param id UUID нормы обеспечения
     * @returns ProvisionNormDto OK
     * @throws ApiError
     */
    public static getProvisionNormById(
        id: string,
    ): CancelablePromise<ProvisionNormDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/provision-norms/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить норму обеспечения
     * Обновляет реквизиты нормы и, при передаче списка строк, полностью заменяет набор
     * номенклатуры в норме на переданный.
     *
     * @param id UUID нормы обеспечения
     * @param requestBody
     * @returns ProvisionNormDto OK
     * @throws ApiError
     */
    public static updateProvisionNorm(
        id: string,
        requestBody: ProvisionNormUpdateRequest,
    ): CancelablePromise<ProvisionNormDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/hr/provision-norms/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить норму обеспечения
     * Выполняет soft delete нормы обеспечения. Норма помечается как удалённая и не используется
     * при расчёте обеспеченности, но остаётся в базе для истории.
     *
     * @param id UUID нормы обеспечения
     * @returns any OK
     * @throws ApiError
     */
    public static deleteProvisionNorm(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/hr/provision-norms/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить физическое лицо по идентификатору
     * Возвращает анкету физического лица с размерными характеристиками.
     * @param id UUID физического лица
     * @returns PersonDto OK
     * @throws ApiError
     */
    public static getPersonById(
        id: string,
    ): CancelablePromise<PersonDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/persons/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить физическое лицо
     * Обновляет анкетные данные и размерные характеристики физического лица.
     * @param id UUID физического лица
     * @param requestBody
     * @returns PersonDto OK
     * @throws ApiError
     */
    public static updatePerson(
        id: string,
        requestBody: PersonUpdateRequest,
    ): CancelablePromise<PersonDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/hr/persons/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить физическое лицо
     * Выполняет soft delete записи физического лица. Данные остаются в БД для истории.
     * @param id UUID физического лица
     * @returns any OK
     * @throws ApiError
     */
    public static deletePerson(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/hr/persons/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить документ списания по идентификатору
     * Возвращает заголовок документа списания и все строки списания ВИ.
     * @param id UUID документа списания
     * @returns WriteOffDocumentDto OK
     * @throws ApiError
     */
    public static getWriteOffDocumentById(
        id: string,
    ): CancelablePromise<WriteOffDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/writeoff/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить документ списания (только DRAFT)
     * Разрешено изменять только документ в статусе DRAFT.
     * @param id UUID документа списания
     * @param requestBody
     * @returns WriteOffDocumentDto OK
     * @throws ApiError
     */
    public static updateWriteOffDocument(
        id: string,
        requestBody: WriteOffUpdateRequest,
    ): CancelablePromise<WriteOffDocumentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/docs/writeoff/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить документ списания
     * Выполняет soft delete документа. Проведенные документы удалять нельзя.
     * @param id UUID документа списания
     * @returns any OK
     * @throws ApiError
     */
    public static deleteWriteOffDocument(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/docs/writeoff/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить документ временной выдачи по идентификатору
     * Возвращает шапку документа и список строк временной выдачи ВИ.
     * @param id UUID документа временной выдачи
     * @returns TemporaryIssueDocumentDto OK
     * @throws ApiError
     */
    public static getTemporaryIssueDocumentById(
        id: string,
    ): CancelablePromise<TemporaryIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/temporary-issue/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить документ временной выдачи (только DRAFT)
     * Разрешено изменять только документ в статусе DRAFT.
     * @param id UUID документа временной выдачи
     * @param requestBody
     * @returns TemporaryIssueDocumentDto OK
     * @throws ApiError
     */
    public static updateTemporaryIssueDocument(
        id: string,
        requestBody: TemporaryIssueUpdateRequest,
    ): CancelablePromise<TemporaryIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/docs/temporary-issue/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить документ временной выдачи
     * Выполняет soft delete. Проведенные документы удалять нельзя.
     * @param id UUID документа временной выдачи
     * @returns any OK
     * @throws ApiError
     */
    public static deleteTemporaryIssueDocument(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/docs/temporary-issue/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить документ возврата по идентификатору
     * Возвращает заголовок документа и все строки возврата ВИ.
     * @param id UUID документа возврата
     * @returns ReturnDocumentDto OK
     * @throws ApiError
     */
    public static getReturnDocumentById(
        id: string,
    ): CancelablePromise<ReturnDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/return/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить документ возврата (только DRAFT)
     * Разрешено изменять только документ в статусе DRAFT.
     * @param id UUID документа возврата
     * @param requestBody
     * @returns ReturnDocumentDto OK
     * @throws ApiError
     */
    public static updateReturnDocument(
        id: string,
        requestBody: ReturnUpdateRequest,
    ): CancelablePromise<ReturnDocumentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/docs/return/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить документ возврата
     * Выполняет soft delete документа. Проведенные документы удалять нельзя.
     * @param id UUID документа возврата
     * @returns any OK
     * @throws ApiError
     */
    public static deleteReturnDocument(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/docs/return/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить приказ о замене по идентификатору
     * Возвращает полный состав приказа о замене вещей (шапка + строки) по ID документа.
     * @param id Идентификатор приказа
     * @returns ReplacementOrderDto Приказ найден
     * @throws ApiError
     */
    public static getReplacementOrderById(
        id: string,
    ): CancelablePromise<ReplacementOrderDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/replacement-orders/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Приказ не найден`,
            },
        });
    }
    /**
     * Изменить приказ о замене вещей
     * Изменяет приказ в статусе DRAFT (шапка и строки). Для POSTED/CANCELLED изменение запрещено.
     * @param id Идентификатор приказа
     * @param requestBody
     * @returns ReplacementOrderDto Приказ обновлён
     * @throws ApiError
     */
    public static updateReplacementOrder(
        id: string,
        requestBody: ReplacementOrderUpdateRequest,
    ): CancelablePromise<ReplacementOrderDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/docs/replacement-orders/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Попытка изменить неподдерживаемый статус`,
                404: `Приказ не найден`,
            },
        });
    }
    /**
     * Удалить (мягко) приказ о замене вещей
     * Выполняет мягкое удаление приказа (soft delete) с фиксацией в аудите.
     * Удаление проведённого приказа запрещено — необходимо сначала выполнить отмену.
     *
     * @param id Идентификатор приказа
     * @returns void
     * @throws ApiError
     */
    public static deleteReplacementOrder(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/docs/replacement-orders/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Попытка удалить проведённый приказ`,
                404: `Приказ не найден`,
            },
        });
    }
    /**
     * Получить документ прихода по идентификатору
     * Возвращает карточку документа прихода с деталями по строкам.
     * @param id UUID документа прихода
     * @returns ReceiptDocumentDto OK
     * @throws ApiError
     */
    public static getReceiptDocumentById(
        id: string,
    ): CancelablePromise<ReceiptDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/receipts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить документ прихода
     * Обновляет шапку и строки документа прихода.
     * Обновление разрешено только для документов в статусе DRAFT.
     *
     * @param id UUID документа прихода
     * @param requestBody
     * @returns ReceiptDocumentDto OK
     * @throws ApiError
     */
    public static updateReceiptDocument(
        id: string,
        requestBody: ReceiptUpdateRequest,
    ): CancelablePromise<ReceiptDocumentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/docs/receipts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить документ прихода
     * Выполняет soft delete документа прихода и его строк.
     * История при этом остаётся в базе данных.
     *
     * @param id UUID документа прихода
     * @returns any OK
     * @throws ApiError
     */
    public static deleteReceiptDocument(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/docs/receipts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить акт приема качественного состояния по идентификатору
     * Возвращает заголовок и строки акта приема качественного состояния.
     * @param id UUID акта приема качественного состояния
     * @returns QualityAcceptanceDocumentDto OK
     * @throws ApiError
     */
    public static getQualityAcceptanceDocumentById(
        id: string,
    ): CancelablePromise<QualityAcceptanceDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/quality-acceptance/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить акт приема качественного состояния (только DRAFT)
     * Разрешено изменять только акт в статусе DRAFT. Позволяет обновить заголовок и строки.
     * @param id UUID акта приема качественного состояния
     * @param requestBody
     * @returns QualityAcceptanceDocumentDto OK
     * @throws ApiError
     */
    public static updateQualityAcceptanceDocument(
        id: string,
        requestBody: QualityAcceptanceUpdateRequest,
    ): CancelablePromise<QualityAcceptanceDocumentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/docs/quality-acceptance/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить акт приема качественного состояния
     * Выполняет soft delete записи акта. Данные остаются в БД для истории.
     * @param id UUID акта приема качественного состояния
     * @returns any OK
     * @throws ApiError
     */
    public static deleteQualityAcceptanceDocument(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/docs/quality-acceptance/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить документ перемещения по идентификатору
     * Возвращает шапку и строки документа перемещения ВИ.
     * @param id Идентификатор документа
     * @returns MovementDocumentDto Документ найден
     * @throws ApiError
     */
    public static getMovementDocumentById(
        id: string,
    ): CancelablePromise<MovementDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/movements/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Документ не найден`,
            },
        });
    }
    /**
     * Изменить документ перемещения ВИ
     * Изменяет документ перемещения в статусе DRAFT. Для POSTED/CANCELLED изменение запрещено.
     * @param id Идентификатор документа
     * @param requestBody
     * @returns MovementDocumentDto Документ обновлён
     * @throws ApiError
     */
    public static updateMovementDocument(
        id: string,
        requestBody: MovementDocumentUpdateRequest,
    ): CancelablePromise<MovementDocumentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/docs/movements/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Попытка изменить неподдерживаемый статус`,
                404: `Документ не найден`,
            },
        });
    }
    /**
     * Удалить (мягко) документ перемещения ВИ
     * Выполняет мягкое удаление (soft delete) документа перемещения с записью в аудит.
     * Удаление проведённого документа запрещено — нужно сначала отменить проведение.
     *
     * @param id Идентификатор документа
     * @returns void
     * @throws ApiError
     */
    public static deleteMovementDocument(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/docs/movements/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Попытка удалить проведённый документ`,
                404: `Документ не найден`,
            },
        });
    }
    /**
     * Получить документ выдачи по идентификатору
     * Возвращает заголовок документа и все строки выдачи ВИ.
     * @param id UUID документа выдачи
     * @returns IssueDocumentDto OK
     * @throws ApiError
     */
    public static getIssueDocumentById(
        id: string,
    ): CancelablePromise<IssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/issue/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить документ выдачи (только DRAFT)
     * Разрешено изменять только документ в статусе DRAFT.
     * @param id UUID документа выдачи
     * @param requestBody
     * @returns IssueDocumentDto OK
     * @throws ApiError
     */
    public static updateIssueDocument(
        id: string,
        requestBody: IssueUpdateRequest,
    ): CancelablePromise<IssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/docs/issue/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить документ выдачи
     * Выполняет soft delete документа. Проведенные документы удалять нельзя.
     * @param id UUID документа выдачи
     * @returns any OK
     * @throws ApiError
     */
    public static deleteIssueDocument(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/docs/issue/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить документ оприходования по идентификатору
     * Возвращает заголовок и строки документа оприходования излишков.
     * @param id UUID документа оприходования излишков
     * @returns InventorySurplusDocumentDto OK
     * @throws ApiError
     */
    public static getInventorySurplusDocumentById(
        id: string,
    ): CancelablePromise<InventorySurplusDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/inventory-surplus/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить документ оприходования (только DRAFT)
     * Разрешено изменять только документ в статусе DRAFT. Обновляет заголовок и строки.
     * @param id UUID документа оприходования излишков
     * @param requestBody
     * @returns InventorySurplusDocumentDto OK
     * @throws ApiError
     */
    public static updateInventorySurplusDocument(
        id: string,
        requestBody: InventorySurplusUpdateRequest,
    ): CancelablePromise<InventorySurplusDocumentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/docs/inventory-surplus/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить документ оприходования
     * Выполняет soft delete документа. Проведенные документы удалять нельзя, их нужно сначала отменить.
     * @param id UUID документа оприходования излишков
     * @returns any OK
     * @throws ApiError
     */
    public static deleteInventorySurplusDocument(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/docs/inventory-surplus/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить документ инвентаризации по идентификатору
     * Возвращает шапку и строки документа инвентаризации ВИ.
     * @param id Идентификатор документа
     * @returns InventoryDocumentDto Документ найден
     * @throws ApiError
     */
    public static getInventoryDocumentById(
        id: string,
    ): CancelablePromise<InventoryDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/inventories/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Документ не найден`,
            },
        });
    }
    /**
     * Изменить документ инвентаризации ВИ
     * Изменяет документ инвентаризации в статусе DRAFT. Для POSTED/CANCELLED изменение запрещено.
     * @param id Идентификатор документа
     * @param requestBody
     * @returns InventoryDocumentDto Документ обновлён
     * @throws ApiError
     */
    public static updateInventoryDocument(
        id: string,
        requestBody: InventoryDocumentUpdateRequest,
    ): CancelablePromise<InventoryDocumentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/docs/inventories/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Попытка изменить неподдерживаемый статус`,
                404: `Документ не найден`,
            },
        });
    }
    /**
     * Удалить (мягко) документ инвентаризации ВИ
     * Выполняет мягкое удаление (soft delete) документа инвентаризации с записью в аудит.
     * Удаление проведённого документа запрещено — нужно сначала отменить проведение.
     *
     * @param id Идентификатор документа
     * @returns void
     * @throws ApiError
     */
    public static deleteInventoryDocument(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/docs/inventories/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Попытка удалить проведённый документ`,
                404: `Документ не найден`,
            },
        });
    }
    /**
     * Получить пользователя по идентификатору
     * Возвращает данные пользователя по его UUID.
     * @param id UUID пользователя
     * @returns UserDto OK
     * @throws ApiError
     */
    public static adminGetUserById(
        id: string,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить пользователя
     * Обновляет пароль, роли и флаг активности пользователя.
     * @param id UUID пользователя
     * @param requestBody
     * @returns UserDto OK
     * @throws ApiError
     */
    public static adminUpdateUser(
        id: string,
        requestBody: UpdateUserRequest,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/admin/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Мягко удалить пользователя
     * Выполняет soft delete пользователя: запись остаётся в БД, но помечается как удалённая и неактивная.
     * @param id UUID пользователя
     * @returns any OK
     * @throws ApiError
     */
    public static adminSoftDeleteUser(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Сменить статус плана закупок
     * Изменяет статус плана закупок (например, DRAFT → APPROVED или DRAFT → REJECTED).
     * Логика допустимых переходов статусов определяется в доменной логике сервиса.
     *
     * Типичные сценарии:
     * - утверждение плана к исполнению,
     * - возврат плана на доработку,
     * - пометка плана как отменённого/закрытого.
     *
     * @param id UUID плана закупок
     * @param status Целевой статус плана закупок
     * @returns PurchasePlanDto OK
     * @throws ApiError
     */
    public static changeStatus(
        id: string,
        status: 'DRAFT' | 'APPROVED' | 'SENT' | 'CLOSED',
    ): CancelablePromise<PurchasePlanDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/stock/planning/plans/{id}/status',
            path: {
                'id': id,
            },
            query: {
                'status': status,
            },
        });
    }
    /**
     * Сформировать план закупок по истекающим срокам носки ВИ
     * Формирует новый план закупок ВИ на заданный период на основе:
     * - норм обеспечения,
     * - текущих закреплений ВИ за сотрудниками,
     * - сроков носки и дат окончания носки.
     *
     * В результате создаётся сущность плана закупок, содержащая:
     * - заголовок (организация, период планирования, статус),
     * - строки плана по номенклатуре (что и в каком количестве требуется закупить).
     * План создаётся, как правило, в статусе DRAFT.
     *
     * @param requestBody
     * @returns PurchasePlanDto OK
     * @throws ApiError
     */
    public static generate(
        requestBody: PurchasePlanGenerateRequest,
    ): CancelablePromise<PurchasePlanDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/stock/planning/plans/generate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Создать черновик документа изменения категории ВИ
     * Создаёт новый документ изменения категории ВИ в статусе DRAFT.
     * В документе фиксируются текущие категории остатков и желаемые новые категории.
     * Фактическое изменение категорий записей остатков (StockBalance) выполняется
     * только при проведении документа (операция POST).
     *
     * @param requestBody
     * @returns CategoryChangeDocumentDto OK
     * @throws ApiError
     */
    public static create(
        requestBody: CategoryChangeDocumentCreateRequest,
    ): CancelablePromise<CategoryChangeDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/stock/category-changes',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Провести документ изменения категории ВИ
     * Переводит документ изменения категории ВИ в статус POSTED и обновляет категории
     * соответствующих записей складских остатков (StockBalance), не изменяя количества.
     *
     * Повторное проведение уже проведённого документа не допускается.
     *
     * @param id UUID документа изменения категории ВИ
     * @returns CategoryChangeDocumentDto OK
     * @throws ApiError
     */
    public static post(
        id: string,
    ): CancelablePromise<CategoryChangeDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/stock/category-changes/{id}/post',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Список складов (без пагинации)
     * Возвращает полный список активных складов. Для UI обычно рекомендуется использовать пагинированный эндпоинт /page.
     * @returns WarehouseDto OK
     * @throws ApiError
     */
    public static getList(): CancelablePromise<Array<WarehouseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/warehouses',
        });
    }
    /**
     * Создать склад
     * Создаёт новый склад в рамках указанной организации.
     * Код склада должен быть уникальным в пределах организации.
     * Можно привязать склад к конкретному подразделению (OrgUnit).
     *
     * @param requestBody
     * @returns WarehouseDto OK
     * @throws ApiError
     */
    public static createWarehouse(
        requestBody: WarehouseCreateRequest,
    ): CancelablePromise<WarehouseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nsi/warehouses',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Создать зону склада
     * Создаёт новую зону в рамках выбранного склада.
     * Код зоны должен быть уникальным в пределах склада.
     * Поле sortOrder используется для управления порядком отображения зон.
     *
     * @param requestBody
     * @returns WarehouseZoneDto OK
     * @throws ApiError
     */
    public static create1(
        requestBody: WarehouseZoneCreateRequest,
    ): CancelablePromise<WarehouseZoneDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nsi/warehouse-zones',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Создать ячейку склада
     * Создаёт новую ячейку склада в рамках указанного склада и, при необходимости, зоны склада.
     * Код ячейки должен быть уникальным в пределах склада.
     *
     * @param requestBody
     * @returns WarehouseCellDto OK
     * @throws ApiError
     */
    public static createWarehouseCell(
        requestBody: WarehouseCellCreateRequest,
    ): CancelablePromise<WarehouseCellDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nsi/warehouse-cells',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Список единиц измерения (без пагинации)
     * Возвращает полный список единиц измерения. Для UI лучше использовать пагинированный эндпоинт /page.
     * @returns UnitOfMeasureDto OK
     * @throws ApiError
     */
    public static listUnitsOfMeasure(): CancelablePromise<Array<UnitOfMeasureDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/units',
        });
    }
    /**
     * Создать единицу измерения
     * Создаёт новую единицу измерения. Код должен быть уникальным.
     * @param requestBody
     * @returns UnitOfMeasureDto OK
     * @throws ApiError
     */
    public static createUnitOfMeasure(
        requestBody: UnitOfMeasureCreateRequest,
    ): CancelablePromise<UnitOfMeasureDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nsi/units',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Список категорий качественного состояния (без пагинации)
     * Возвращает полный список категорий качественного состояния. Для рабочих экранов рекомендуется пагинированный поиск.
     * @returns QualityCategoryDto OK
     * @throws ApiError
     */
    public static listQualityCategories(): CancelablePromise<Array<QualityCategoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/quality-categories',
        });
    }
    /**
     * Создать категорию качественного состояния
     * Создаёт новую категорию качественного состояния ВИ.
     * @param requestBody
     * @returns QualityCategoryDto OK
     * @throws ApiError
     */
    public static createQualityCategory(
        requestBody: QualityCategoryCreateRequest,
    ): CancelablePromise<QualityCategoryDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nsi/quality-categories',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Список организаций (без пагинации)
     * Возвращает полный список активных организаций. Для UI обычно рекомендуется использовать пагинированный эндпоинт /page.
     * @returns OrganizationDto OK
     * @throws ApiError
     */
    public static listOrganizations(): CancelablePromise<Array<OrganizationDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/organizations',
        });
    }
    /**
     * Создать организацию
     * Создаёт новую организацию. Код должен быть уникальным.
     * @param requestBody
     * @returns OrganizationDto OK
     * @throws ApiError
     */
    public static createOrganization(
        requestBody: OrganizationCreateRequest,
    ): CancelablePromise<OrganizationDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nsi/organizations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Создать подразделение
     * Создаёт новое подразделение (OrgUnit) в рамках указанной организации.
     * Можно привязать подразделение к родительскому (иерархия) через parentId.
     *
     * @param requestBody
     * @returns OrgUnitDto OK
     * @throws ApiError
     */
    public static createOrgUnit(
        requestBody: OrgUnitCreateRequest,
    ): CancelablePromise<OrgUnitDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nsi/org-units',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Список номенклатуры (без пагинации)
     * Возвращает полный список номенклатуры. Для UI рекомендуется использовать пагинированный эндпоинт /page.
     * @returns ItemDto OK
     * @throws ApiError
     */
    public static listItems(): CancelablePromise<Array<ItemDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/items',
        });
    }
    /**
     * Создать номенклатуру
     * Создаёт новую номенклатуру. Код (артикул) должен быть уникальным.
     * Необходимо указать базовую единицу измерения. Группа номенклатуры указывается опционально.
     *
     * @param requestBody
     * @returns ItemDto OK
     * @throws ApiError
     */
    public static createItem(
        requestBody: ItemCreateRequest,
    ): CancelablePromise<ItemDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nsi/items',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Создать норму обеспечения ВИ
     * Создаёт новую норму обеспечения ВИ для категории сотрудников и номенклатуры.
     * Указывается количество, срок носки (в месяцах) и период действия нормы.
     *
     * @param requestBody
     * @returns ItemSupplyNormDto OK
     * @throws ApiError
     */
    public static createItemSupplyNorm(
        requestBody: ItemSupplyNormCreateRequest,
    ): CancelablePromise<ItemSupplyNormDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nsi/item-supply-norms',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Список всех групп номенклатуры (плоский)
     * Возвращает полный список групп номенклатуры без иерархической структуры.
     * @returns ItemGroupDto OK
     * @throws ApiError
     */
    public static listItemGroups(): CancelablePromise<Array<ItemGroupDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/item-groups',
        });
    }
    /**
     * Создать группу номенклатуры
     * Создаёт новую группу номенклатуры. Код группы должен быть уникальным.
     * Можно указать родительскую группу (parentId) для построения иерархии.
     *
     * @param requestBody
     * @returns ItemGroupDto OK
     * @throws ApiError
     */
    public static createItemGroup(
        requestBody: ItemGroupCreateRequest,
    ): CancelablePromise<ItemGroupDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nsi/item-groups',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Список категорий сотрудников
     * Возвращает полный список категорий сотрудников.
     * @returns EmployeeCategoryDto OK
     * @throws ApiError
     */
    public static listEmployeeCategories(): CancelablePromise<Array<EmployeeCategoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/employee-categories',
        });
    }
    /**
     * Создать категорию сотрудников
     * Создаёт новую категорию сотрудников. Код категории должен быть уникальным.
     * @param requestBody
     * @returns EmployeeCategoryDto OK
     * @throws ApiError
     */
    public static createEmployeeCategory(
        requestBody: EmployeeCategoryCreateRequest,
    ): CancelablePromise<EmployeeCategoryDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nsi/employee-categories',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Список точек интеграции
     * @returns IntegrationEndpoint OK
     * @throws ApiError
     */
    public static listIntegrationEndpoints(): CancelablePromise<Array<IntegrationEndpoint>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/integration/endpoints',
        });
    }
    /**
     * Создать точку интеграции (заглушка)
     * @param code
     * @param name
     * @param system
     * @param baseUrl
     * @returns IntegrationEndpoint OK
     * @throws ApiError
     */
    public static createIntegrationEndpoint(
        code: string,
        name: string,
        system: 'HR_SYSTEM' | 'ERP' | 'ACCOUNTING' | 'SECURITY_SYSTEM',
        baseUrl?: string,
    ): CancelablePromise<IntegrationEndpoint> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/integration/endpoints',
            query: {
                'code': code,
                'name': name,
                'system': system,
                'baseUrl': baseUrl,
            },
        });
    }
    /**
     * Проверить соединение (заглушка)
     * @param code
     * @returns IntegrationEndpoint OK
     * @throws ApiError
     */
    public static testIntegrationEndpointConnection(
        code: string,
    ): CancelablePromise<IntegrationEndpoint> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/integration/endpoints/{code}/test',
            path: {
                'code': code,
            },
        });
    }
    /**
     * Отправить тестовую заявку (заглушка)
     * @param code
     * @param messageType
     * @param requestBody
     * @returns IntegrationMessage OK
     * @throws ApiError
     */
    public static sendTestIntegrationMessage(
        code: string,
        messageType: string,
        requestBody?: string,
    ): CancelablePromise<IntegrationMessage> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/integration/endpoints/{code}/send',
            path: {
                'code': code,
            },
            query: {
                'messageType': messageType,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Создать норму обеспечения
     * Создаёт новую норму обеспечения с набором строк по номенклатуре.
     * Код нормы должен быть уникальным.
     *
     * @param requestBody
     * @returns ProvisionNormDto OK
     * @throws ApiError
     */
    public static createProvisionNorm(
        requestBody: ProvisionNormCreateRequest,
    ): CancelablePromise<ProvisionNormDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/hr/provision-norms',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Список физических лиц (без пагинации)
     * Возвращает полный список физических лиц. Для рабочих экранов рекомендуется использовать пагинированный поиск.
     * @returns PersonDto OK
     * @throws ApiError
     */
    public static listPersons(): CancelablePromise<Array<PersonDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/persons',
        });
    }
    /**
     * Создать физическое лицо
     * Создаёт новую запись физического лица с анкетными и размерными данными.
     * @param requestBody
     * @returns PersonDto OK
     * @throws ApiError
     */
    public static createPerson(
        requestBody: PersonCreateRequest,
    ): CancelablePromise<PersonDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/hr/persons',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Кадровое перемещение
     * Обновляет организацию/подразделение/должность/звание сотрудника и фиксирует событие
     * статуса TRANSFERRED (кадровое перемещение).
     *
     * @param id UUID сотрудника
     * @param requestBody
     * @returns EmployeeDto OK
     * @throws ApiError
     */
    public static transferEmployee(
        id: string,
        requestBody: EmployeeTransferRequest,
    ): CancelablePromise<EmployeeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/hr/employees/{id}/transfer',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Увольнение
     * Устанавливает дату увольнения, деактивирует сотрудника и фиксирует событие DISMISSED.
     *
     * @param id UUID сотрудника
     * @param requestBody
     * @returns EmployeeDto OK
     * @throws ApiError
     */
    public static dismissEmployee(
        id: string,
        requestBody: EmployeeDismissRequest,
    ): CancelablePromise<EmployeeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/hr/employees/{id}/dismiss',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Приём на службу
     * Создаёт запись сотрудника на основе существующего физического лица и фиксирует событие
     * статуса HIRED (приём на службу).
     *
     * @param requestBody
     * @returns EmployeeDto OK
     * @throws ApiError
     */
    public static hireEmployee(
        requestBody: EmployeeHireRequest,
    ): CancelablePromise<EmployeeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/hr/employees/hire',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Создать черновик документа возврата ВИ
     * Создаёт новый документ возврата ВИ в статусе DRAFT.
     * Увеличение остатков и уменьшение закреплений происходит при проведении документа.
     *
     * @param requestBody
     * @returns EmployeeReturnDocumentDto OK
     * @throws ApiError
     */
    public static createEmployeeReturnDocumentDraft(
        requestBody: EmployeeReturnDocumentCreateRequest,
    ): CancelablePromise<EmployeeReturnDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/hr/employee-returns',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Провести документ возврата ВИ
     * Переводит документ в статус POSTED, увеличивает складские остатки и уменьшает/закрывает
     * записи закреплений ВИ за сотрудниками.
     *
     * @param id UUID документа
     * @returns EmployeeReturnDocumentDto OK
     * @throws ApiError
     */
    public static postEmployeeReturnDocument(
        id: string,
    ): CancelablePromise<EmployeeReturnDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/hr/employee-returns/{id}/post',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Создать черновик документа выдачи ВИ
     * Создаёт новый документ выдачи ВИ в статусе DRAFT.
     * Реальное уменьшение остатков и создание закреплений происходит при проведении документа.
     *
     * @param requestBody
     * @returns EmployeeIssueDocumentDto OK
     * @throws ApiError
     */
    public static createEmployeeIssueDocumentDraft(
        requestBody: EmployeeIssueDocumentCreateRequest,
    ): CancelablePromise<EmployeeIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/hr/employee-issues',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Провести документ выдачи ВИ
     * Переводит документ в статус POSTED, уменьшает складские остатки и создаёт записи закрепления
     * ВИ за сотрудниками (активные строки арматурных карточек).
     *
     * @param id UUID документа
     * @returns EmployeeIssueDocumentDto OK
     * @throws ApiError
     */
    public static postEmployeeIssueDocument(
        id: string,
    ): CancelablePromise<EmployeeIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/hr/employee-issues/{id}/post',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Список зарегистрированного складского оборудования
     * @returns Device OK
     * @throws ApiError
     */
    public static listDevices(): CancelablePromise<Array<Device>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/equipment/devices',
        });
    }
    /**
     * Зарегистрировать оборудование (заглушка)
     * @param code
     * @param name
     * @param type
     * @param warehouseId
     * @returns Device OK
     * @throws ApiError
     */
    public static registerDevice(
        code: string,
        name: string,
        type: string,
        warehouseId?: string,
    ): CancelablePromise<Device> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/equipment/devices',
            query: {
                'code': code,
                'name': name,
                'type': type,
                'warehouseId': warehouseId,
            },
        });
    }
    /**
     * Heartbeat от оборудования (заглушка)
     * @param code
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static sendDeviceHeartbeat(
        code: string,
        requestBody?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/equipment/devices/{code}/heartbeat',
            path: {
                'code': code,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Сообщить об ошибке оборудования (заглушка)
     * @param code
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static reportDeviceError(
        code: string,
        requestBody: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/equipment/devices/{code}/error',
            path: {
                'code': code,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Создать документ списания ВИ
     * Создает новый документ списания в статусе DRAFT.
     * Остатки ВИ не изменяются до момента проведения документа.
     *
     * @param requestBody
     * @returns WriteOffDocumentDto OK
     * @throws ApiError
     */
    public static createWriteOffDocument(
        requestBody: WriteOffCreateRequest,
    ): CancelablePromise<WriteOffDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/writeoff',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Провести документ списания
     * Переводит документ списания из статуса DRAFT в статус POSTED
     * и уменьшает остатки ВИ на складе по каждой строке документа.
     *
     * @param id UUID документа списания
     * @returns WriteOffDocumentDto OK
     * @throws ApiError
     */
    public static postWriteOffDocument(
        id: string,
    ): CancelablePromise<WriteOffDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/writeoff/{id}/post',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Отменить документ списания
     * Переводит документ в статус CANCELLED. Если документ был проведен,
     * влияние на остатки автоматически откатывается (остатки увеличиваются).
     *
     * @param id UUID документа списания
     * @returns WriteOffDocumentDto OK
     * @throws ApiError
     */
    public static cancelWriteOffDocument(
        id: string,
    ): CancelablePromise<WriteOffDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/writeoff/{id}/cancel',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Создать документ временной выдачи ВИ
     * Создает документ временной выдачи в статусе DRAFT.
     * Остатки ВИ не изменяются до момента проведения документа (операция POST).
     *
     * @param requestBody
     * @returns TemporaryIssueDocumentDto OK
     * @throws ApiError
     */
    public static createTemporaryIssueDocument(
        requestBody: TemporaryIssueCreateRequest,
    ): CancelablePromise<TemporaryIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/temporary-issue',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Провести документ временной выдачи
     * Переводит документ из статуса DRAFT в статус POSTED
     * и уменьшает остатки ВИ на складе по каждой строке документа.
     *
     * @param id UUID документа временной выдачи
     * @returns TemporaryIssueDocumentDto OK
     * @throws ApiError
     */
    public static postTemporaryIssueDocument(
        id: string,
    ): CancelablePromise<TemporaryIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/temporary-issue/{id}/post',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Отменить документ временной выдачи
     * Переводит документ в статус CANCELLED. Если документ был проведен,
     * влияние на остатки автоматически откатывается (ВИ возвращается на склад).
     *
     * @param id UUID документа временной выдачи
     * @returns TemporaryIssueDocumentDto OK
     * @throws ApiError
     */
    public static cancelTemporaryIssueDocument(
        id: string,
    ): CancelablePromise<TemporaryIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/temporary-issue/{id}/cancel',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Создать документ возврата ВИ
     * Создает новый документ возврата в статусе DRAFT.
     * Остатки ВИ не изменяются до момента проведения документа.
     *
     * @param requestBody
     * @returns ReturnDocumentDto OK
     * @throws ApiError
     */
    public static createReturnDocument(
        requestBody: ReturnCreateRequest,
    ): CancelablePromise<ReturnDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/return',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Провести документ возврата
     * Переводит документ возврата из статуса DRAFT в статус POSTED
     * и увеличивает остатки ВИ на складе по каждой строке документа.
     *
     * @param id UUID документа возврата
     * @returns ReturnDocumentDto OK
     * @throws ApiError
     */
    public static postReturnDocument(
        id: string,
    ): CancelablePromise<ReturnDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/return/{id}/post',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Отменить документ возврата
     * Переводит документ в статус CANCELLED. Если документ был проведен,
     * влияние на остатки автоматически откатывается (остатки уменьшаются).
     *
     * @param id UUID документа возврата
     * @returns ReturnDocumentDto OK
     * @throws ApiError
     */
    public static cancelReturnDocument(
        id: string,
    ): CancelablePromise<ReturnDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/return/{id}/cancel',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Создать приказ о замене вещей
     * Создаёт новый приказ о замене ВИ в статусе DRAFT.
     * На входе — шапка документа и список строк (номенклатура, количество, место хранения).
     *
     * @param requestBody
     * @returns ReplacementOrderDto Приказ создан
     * @throws ApiError
     */
    public static createReplacementOrder(
        requestBody: ReplacementOrderCreateRequest,
    ): CancelablePromise<ReplacementOrderDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/replacement-orders',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Некорректные данные запроса`,
            },
        });
    }
    /**
     * Провести приказ о замене вещей
     * Переводит приказ в статус POSTED и уменьшает остатки по складу по всем строкам документа.
     * Если приказ уже проведён или отменён — вернёт ошибку.
     *
     * @param id Идентификатор приказа
     * @returns ReplacementOrderDto Приказ проведён
     * @throws ApiError
     */
    public static postReplacementOrder(
        id: string,
    ): CancelablePromise<ReplacementOrderDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/replacement-orders/{id}/post',
            path: {
                'id': id,
            },
            errors: {
                400: `Неверный статус для проведения`,
                404: `Приказ не найден`,
            },
        });
    }
    /**
     * Отменить приказ о замене вещей
     * Переводит приказ в статус CANCELLED.
     * Если приказ был проведён — выполняется обратная операция по остаткам (возврат на склад).
     *
     * @param id Идентификатор приказа
     * @returns ReplacementOrderDto Приказ отменён
     * @throws ApiError
     */
    public static cancelReplacementOrder(
        id: string,
    ): CancelablePromise<ReplacementOrderDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/replacement-orders/{id}/cancel',
            path: {
                'id': id,
            },
            errors: {
                404: `Приказ не найден`,
            },
        });
    }
    /**
     * Создать документ прихода
     * Создаёт новый документ прихода в статусе DRAFT.
     * В теле запроса передаются шапка документа и строки.
     *
     * @param requestBody
     * @returns ReceiptDocumentDto OK
     * @throws ApiError
     */
    public static createReceiptDocument(
        requestBody: ReceiptCreateRequest,
    ): CancelablePromise<ReceiptDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/receipts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Сторнировать (отменить проведение) документа прихода
     * Сторнирует ранее проведённый документ прихода: откатывает изменения по остаткам и переводит
     * документ в статус CANCELLED. Разрешено только для документов в статусе POSTED.
     *
     * @param id UUID документа прихода
     * @returns ReceiptDocumentDto OK
     * @throws ApiError
     */
    public static unpostReceiptDocument(
        id: string,
    ): CancelablePromise<ReceiptDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/receipts/{id}/unpost',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Провести документ прихода
     * Переводит документ прихода в статус POSTED и применяет изменения к складским остаткам.
     * Повторное проведение уже проведённого документа запрещено.
     *
     * @param id UUID документа прихода
     * @returns ReceiptDocumentDto OK
     * @throws ApiError
     */
    public static postReceiptDocument(
        id: string,
    ): CancelablePromise<ReceiptDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/receipts/{id}/post',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Создать акт приема качественного состояния
     * Создает новый акт приема качественного состояния в статусе DRAFT.
     * Количество в складских остатках не изменяется — фиксируется только качественное состояние ВИ.
     *
     * @param requestBody
     * @returns QualityAcceptanceDocumentDto OK
     * @throws ApiError
     */
    public static createQualityAcceptanceDocument(
        requestBody: QualityAcceptanceCreateRequest,
    ): CancelablePromise<QualityAcceptanceDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/quality-acceptance',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Провести акт приема качественного состояния
     * Переводит акт из статуса DRAFT в статус POSTED.
     * Количество на остатках не меняется — акт влияет только на учет качественного состояния.
     *
     * @param id UUID акта приема качественного состояния
     * @returns QualityAcceptanceDocumentDto OK
     * @throws ApiError
     */
    public static postQualityAcceptanceDocument(
        id: string,
    ): CancelablePromise<QualityAcceptanceDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/quality-acceptance/{id}/post',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Отменить акт приема качественного состояния
     * Переводит акт в статус CANCELLED. Повторное проведение отмененного акта запрещено.
     * @param id UUID акта приема качественного состояния
     * @returns QualityAcceptanceDocumentDto OK
     * @throws ApiError
     */
    public static cancelQualityAcceptanceDocument(
        id: string,
    ): CancelablePromise<QualityAcceptanceDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/quality-acceptance/{id}/cancel',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Создать документ перемещения ВИ
     * Создаёт новый документ перемещения ВИ в статусе DRAFT.
     * В запросе передаются: шапка (типы организаций/складов) и строки перемещения.
     *
     * @param requestBody
     * @returns MovementDocumentDto Документ создан
     * @throws ApiError
     */
    public static createMovementDocument(
        requestBody: MovementDocumentCreateRequest,
    ): CancelablePromise<MovementDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/movements',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Некорректные данные запроса`,
            },
        });
    }
    /**
     * Провести документ перемещения ВИ
     * Переводит документ в статус POSTED и выполняет движение остатков:
     * уменьшение на складе-отправителе и увеличение на складе-получателе по всем строкам документа.
     *
     * @param id Идентификатор документа
     * @returns MovementDocumentDto Документ проведён
     * @throws ApiError
     */
    public static postMovementDocument(
        id: string,
    ): CancelablePromise<MovementDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/movements/{id}/post',
            path: {
                'id': id,
            },
            errors: {
                400: `Неверный статус для проведения`,
                404: `Документ не найден`,
            },
        });
    }
    /**
     * Отменить документ перемещения ВИ
     * Переводит документ в статус CANCELLED.
     * Если документ был проведён — выполняется обратная операция по остаткам.
     *
     * @param id Идентификатор документа
     * @returns MovementDocumentDto Документ отменён
     * @throws ApiError
     */
    public static cancelMovementDocument(
        id: string,
    ): CancelablePromise<MovementDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/movements/{id}/cancel',
            path: {
                'id': id,
            },
            errors: {
                404: `Документ не найден`,
            },
        });
    }
    /**
     * Создать документ выдачи ВИ
     * Создает новый документ выдачи в статусе DRAFT.
     * Остатки ВИ не изменяются до момента проведения документа.
     *
     * @param requestBody
     * @returns IssueDocumentDto OK
     * @throws ApiError
     */
    public static createIssueDocument(
        requestBody: IssueCreateRequest,
    ): CancelablePromise<IssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/issue',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Провести документ выдачи
     * Переводит документ выдачи из статуса DRAFT в статус POSTED
     * и уменьшает остатки ВИ на складе по каждой строке документа.
     *
     * @param id UUID документа выдачи
     * @returns IssueDocumentDto OK
     * @throws ApiError
     */
    public static postIssueDocument(
        id: string,
    ): CancelablePromise<IssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/issue/{id}/post',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Отменить документ выдачи
     * Переводит документ в статус CANCELLED. Если документ был проведен,
     * влияние на остатки автоматически откатывается.
     *
     * @param id UUID документа выдачи
     * @returns IssueDocumentDto OK
     * @throws ApiError
     */
    public static cancelIssueDocument(
        id: string,
    ): CancelablePromise<IssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/issue/{id}/cancel',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Создать документ оприходования по итогам инвентаризации
     * Создает новый документ оприходования излишков в статусе DRAFT.
     * Количество на остатках не изменяется до проведения документа.
     *
     * @param requestBody
     * @returns InventorySurplusDocumentDto OK
     * @throws ApiError
     */
    public static createInventorySurplusDocument(
        requestBody: InventorySurplusCreateRequest,
    ): CancelablePromise<InventorySurplusDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/inventory-surplus',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Провести документ оприходования по итогам инвентаризации
     * Переводит документ из статуса DRAFT в статус POSTED и увеличивает остатки ВИ
     * на величину излишков по каждой строке документа.
     *
     * @param id UUID документа оприходования излишков
     * @returns InventorySurplusDocumentDto OK
     * @throws ApiError
     */
    public static postInventorySurplusDocument(
        id: string,
    ): CancelablePromise<InventorySurplusDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/inventory-surplus/{id}/post',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Отменить документ оприходования по итогам инвентаризации
     * Переводит документ в статус CANCELLED. Если документ был проведен, влияние на остатки
     * будет автоматически откатано.
     *
     * @param id UUID документа оприходования излишков
     * @returns InventorySurplusDocumentDto OK
     * @throws ApiError
     */
    public static cancelInventorySurplusDocument(
        id: string,
    ): CancelablePromise<InventorySurplusDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/inventory-surplus/{id}/cancel',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Создать документ инвентаризации ВИ
     * Создаёт новый документ инвентаризации ВИ в статусе DRAFT.
     * В запросе передаются шапка (организация, склад, ответственный) и строки с системными и фактическими остатками.
     *
     * @param requestBody
     * @returns InventoryDocumentDto Документ создан
     * @throws ApiError
     */
    public static createInventoryDocument(
        requestBody: InventoryDocumentCreateRequest,
    ): CancelablePromise<InventoryDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/inventories',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Некорректные данные запроса`,
            },
        });
    }
    /**
     * Провести документ инвентаризации ВИ
     * Переводит документ в статус POSTED и выполняет пересчёт остатков по складу:
     * для каждой строки рассчитывается разница counted - system и вызывается изменение остатков.
     *
     * @param id Идентификатор документа
     * @returns InventoryDocumentDto Документ проведён
     * @throws ApiError
     */
    public static postInventoryDocument(
        id: string,
    ): CancelablePromise<InventoryDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/inventories/{id}/post',
            path: {
                'id': id,
            },
            errors: {
                400: `Неверный статус для проведения`,
                404: `Документ не найден`,
            },
        });
    }
    /**
     * Отменить документ инвентаризации ВИ
     * Переводит документ в статус CANCELLED.
     * Если документ был проведён — выполняется обратная корректировка остатков.
     *
     * @param id Идентификатор документа
     * @returns InventoryDocumentDto Документ отменён
     * @throws ApiError
     */
    public static cancelInventoryDocument(
        id: string,
    ): CancelablePromise<InventoryDocumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/inventories/{id}/cancel',
            path: {
                'id': id,
            },
            errors: {
                404: `Документ не найден`,
            },
        });
    }
    /**
     * Список пользователей (без пагинации)
     * Возвращает список всех активных (неудалённых) пользователей. Рекомендуется для внутренних задач, для UI лучше использовать пагинированный эндпоинт /page.
     * @returns UserDto OK
     * @throws ApiError
     */
    public static adminListUsers(): CancelablePromise<Array<UserDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/users',
        });
    }
    /**
     * Создать нового пользователя
     * Создаёт пользователя с указанным логином, паролем, флагом активности и набором ролей.
     * @param requestBody
     * @returns UserDto OK
     * @throws ApiError
     */
    public static adminCreateUser(
        requestBody: CreateUserRequest,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Восстановить пользователя
     * Отменяет мягкое удаление пользователя: сбрасывает флаг deleted, активирует пользователя и пишет запись в аудит.
     * @param id UUID пользователя
     * @returns UserDto OK
     * @throws ApiError
     */
    public static adminRestoreUser(
        id: string,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/users/{id}/restore',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Список всех системных настроек
     * @returns SystemSettingDto OK
     * @throws ApiError
     */
    public static adminListSystemSettings(): CancelablePromise<Array<SystemSettingDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/settings',
        });
    }
    /**
     * Создать/обновить системную настройку
     * @param requestBody
     * @returns SystemSettingDto OK
     * @throws ApiError
     */
    public static adminUpsertSystemSetting(
        requestBody: SystemSettingUpsertRequest,
    ): CancelablePromise<SystemSettingDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/settings',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Список ролей
     * Возвращает список всех ролей, доступных в системе.
     * @returns RoleDto OK
     * @throws ApiError
     */
    public static adminListRoles(): CancelablePromise<Array<RoleDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/roles',
        });
    }
    /**
     * Создать роль
     * Создаёт новую роль с уникальным кодом. Код далее используется при назначении ролей пользователям.
     * @param code Системный код роли, например 'ADMIN' или 'WAREHOUSE_MANAGER'
     * @returns RoleDto OK
     * @throws ApiError
     */
    public static adminCreateRole(
        code: string,
    ): CancelablePromise<RoleDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/roles',
            query: {
                'code': code,
            },
        });
    }
    /**
     * Список планов закупок (по организации, если указана)
     * Возвращает список планов закупок ВИ.
     * Если передан organizationId — отбираются планы только по указанной организации.
     * В противном случае возвращаются планы по всем доступным организациям.
     *
     * Эндпоинт может использоваться для:
     * - обзора активных и исторических планов,
     * - перехода к деталям конкретного плана.
     *
     * @param organizationId UUID организации для фильтрации планов (опционально)
     * @returns PurchasePlanDto OK
     * @throws ApiError
     */
    public static list(
        organizationId?: string,
    ): CancelablePromise<Array<PurchasePlanDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stock/planning/plans',
            query: {
                'organizationId': organizationId,
            },
        });
    }
    /**
     * Получить план закупок по идентификатору
     * Возвращает детализированный план закупок ВИ по его UUID:
     * заголовок и строки плана (номенклатура, количество, период, приоритет и т.п.).
     *
     * @param id UUID плана закупок
     * @returns PurchasePlanDto OK
     * @throws ApiError
     */
    public static get1(
        id: string,
    ): CancelablePromise<PurchasePlanDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stock/planning/plans/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить документ изменения категории ВИ по идентификатору
     * Возвращает карточку документа изменения категории ВИ по UUID:
     * основные реквизиты документа и перечень строк с изменяемыми остатками.
     *
     * @param id UUID документа изменения категории ВИ
     * @returns CategoryChangeDocumentDto OK
     * @throws ApiError
     */
    public static get2(
        id: string,
    ): CancelablePromise<CategoryChangeDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stock/category-changes/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Мягко удалить документ изменения категории ВИ
     * Логическое (soft) удаление документа изменения категории ВИ.
     * Допускается только для документов в статусе DRAFT.
     * Историческая информация о документе сохраняется в базе данных.
     *
     * @param id UUID документа изменения категории ВИ
     * @returns any OK
     * @throws ApiError
     */
    public static delete1(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/stock/category-changes/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Пагинированный список документов изменения категории ВИ
     * Возвращает страницу документов изменения категории ВИ с возможностью фильтрации
     * по организации и периоду дат документа.
     *
     * Как правило, в выборку попадают документы в статусах DRAFT и POSTED, пригодные
     * для анализа истории изменения качественного состояния ВИ.
     *
     * @param organizationId UUID организации, по которой отбираются документы
     * @param from Дата документа с (включительно)
     * @param to Дата документа по (включительно)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageCategoryChangeDocumentDto OK
     * @throws ApiError
     */
    public static search(
        organizationId: string,
        from?: string,
        to?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageCategoryChangeDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stock/category-changes/page',
            query: {
                'organizationId': organizationId,
                'from': from,
                'to': to,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Пагинированный поиск складов
     * Возвращает страницу складов с возможностью фильтрации по коду и/или наименованию.
     * Поиск по подстроке, регистр не учитывается. По умолчанию сортировка идёт по наименованию.
     *
     * @param code Фильтр по коду складов (подстрока, регистр не учитывается)
     * @param name Фильтр по наименованию складов (подстрока, регистр не учитывается)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageWarehouseDto OK
     * @throws ApiError
     */
    public static searchWarehousesPage(
        code?: string,
        name?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageWarehouseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/warehouses/page',
            query: {
                'code': code,
                'name': name,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Список складов по организации
     * Возвращает список всех складов, принадлежащих указанной организации.
     * Обычно используется при настройке адресного хранения и выборе склада в документах.
     *
     * @param orgId UUID организации
     * @returns WarehouseDto OK
     * @throws ApiError
     */
    public static listWarehousesByOrganization(
        orgId: string,
    ): CancelablePromise<Array<WarehouseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/warehouses/by-organization/{orgId}',
            path: {
                'orgId': orgId,
            },
        });
    }
    /**
     * Список зон склада
     * Возвращает список всех зон для указанного склада.
     * Обычно используется для отображения адресной структуры склада (разбиение на зоны).
     *
     * @param warehouseId UUID склада
     * @returns WarehouseZoneDto OK
     * @throws ApiError
     */
    public static listByWarehouse(
        warehouseId: string,
    ): CancelablePromise<Array<WarehouseZoneDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/warehouse-zones/by-warehouse/{warehouseId}',
            path: {
                'warehouseId': warehouseId,
            },
        });
    }
    /**
     * Список ячеек по зоне склада
     * Возвращает список всех ячеек, относящихся к указанной зоне склада.
     * Может использоваться для детализации зоны или настройки адресного хранения.
     *
     * @param zoneId UUID зоны склада
     * @returns WarehouseCellDto OK
     * @throws ApiError
     */
    public static listWarehouseCellsByZone(
        zoneId: string,
    ): CancelablePromise<Array<WarehouseCellDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/warehouse-cells/by-zone/{zoneId}',
            path: {
                'zoneId': zoneId,
            },
        });
    }
    /**
     * Список ячеек по складу
     * Возвращает список всех ячеек склада для указанного склада.
     * Обычно используется для отображения адресной структуры склада в разрезе всего склада.
     *
     * @param warehouseId UUID склада
     * @returns WarehouseCellDto OK
     * @throws ApiError
     */
    public static listWarehouseCellsByWarehouse(
        warehouseId: string,
    ): CancelablePromise<Array<WarehouseCellDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/warehouse-cells/by-warehouse/{warehouseId}',
            path: {
                'warehouseId': warehouseId,
            },
        });
    }
    /**
     * Пагинированный поиск единиц измерения
     * Возвращает страницу единиц измерения с фильтрацией по коду и/или наименованию.
     * Поиск по подстроке, регистр не учитывается.
     *
     * @param code Фильтр по коду единицы измерения (подстрока)
     * @param name Фильтр по наименованию единицы измерения (подстрока)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageUnitOfMeasureDto OK
     * @throws ApiError
     */
    public static searchUnitsOfMeasure(
        code?: string,
        name?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageUnitOfMeasureDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/units/page',
            query: {
                'code': code,
                'name': name,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Пагинированный поиск категорий качественного состояния
     * Поиск по подстроке кода или наименования (регистр не учитывается).
     * @param q Подстрока для поиска по коду/наименованию
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageQualityCategoryDto OK
     * @throws ApiError
     */
    public static searchQualityCategories(
        q?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageQualityCategoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/quality-categories/page',
            query: {
                'q': q,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Пагинированный поиск организаций
     * Возвращает страницу организаций с возможностью фильтрации по коду и/или наименованию.
     * Поиск по подстроке, регистр не учитывается. По умолчанию сортировка идёт по наименованию.
     *
     * @param code Фильтр по коду организации (подстрока, регистр не учитывается)
     * @param name Фильтр по наименованию организации (подстрока, регистр не учитывается)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageOrganizationDto OK
     * @throws ApiError
     */
    public static searchOrganizationsPage(
        code?: string,
        name?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageOrganizationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/organizations/page',
            query: {
                'code': code,
                'name': name,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Список подразделений организации
     * Возвращает список всех подразделений (OrgUnit) для указанной организации.
     * Обычно используется для построения дерева структуры организации на фронтенде.
     *
     * @param orgId UUID организации, для которой требуется получить список подразделений
     * @returns OrgUnitDto OK
     * @throws ApiError
     */
    public static listOrgUnitsByOrganization(
        orgId: string,
    ): CancelablePromise<Array<OrgUnitDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/org-units/by-organization/{orgId}',
            path: {
                'orgId': orgId,
            },
        });
    }
    /**
     * Пагинированный поиск номенклатуры
     * Возвращает страницу номенклатуры с фильтрацией по коду, наименованию и группе.
     * Поиск по подстроке (code, name), регистр не учитывается.
     *
     * @param code Фильтр по коду (артикулу) номенклатуры, подстрока
     * @param name Фильтр по наименованию номенклатуры, подстрока
     * @param groupId Фильтр по группе номенклатуры (UUID группы)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageItemDto OK
     * @throws ApiError
     */
    public static searchItemsPage(
        code?: string,
        name?: string,
        groupId?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageItemDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/items/page',
            query: {
                'code': code,
                'name': name,
                'groupId': groupId,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Пагинированный список норм обеспечения ВИ
     * Возвращает страницу норм обеспечения ВИ с возможностью фильтрации по категории сотрудников
     * и/или номенклатуре.
     *
     * @param employeeCategoryId UUID категории сотрудников
     * @param itemId UUID номенклатуры (ВИ)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageItemSupplyNormDto OK
     * @throws ApiError
     */
    public static searchItemSupplyNormsPage(
        employeeCategoryId?: string,
        itemId?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageItemSupplyNormDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/item-supply-norms/page',
            query: {
                'employeeCategoryId': employeeCategoryId,
                'itemId': itemId,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Список корневых групп номенклатуры
     * Возвращает список групп верхнего уровня (без родителя).
     * @returns ItemGroupDto OK
     * @throws ApiError
     */
    public static listRootItemGroups(): CancelablePromise<Array<ItemGroupDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/item-groups/roots',
        });
    }
    /**
     * Список дочерних групп по родительской
     * Возвращает список групп, у которых parentId совпадает с переданным идентификатором.
     * @param parentId UUID родительской группы
     * @returns ItemGroupDto OK
     * @throws ApiError
     */
    public static listItemGroupsByParent(
        parentId: string,
    ): CancelablePromise<Array<ItemGroupDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nsi/item-groups/by-parent/{parentId}',
            path: {
                'parentId': parentId,
            },
        });
    }
    /**
     * Пагинированный отчёт по срокам носки ВИ
     * Возвращает список текущих закреплений ВИ с указанием даты окончания срока носки
     * и количества дней до конца (или просрочки).
     *
     * Фильтры:
     * - обязательно: organizationId
     * - опционально: orgUnitId, itemId
     * - период: wearEndDate от/до (если не заданы, используется диапазон примерно -1 месяц .. +6 месяцев).
     *
     * @param organizationId UUID организации
     * @param orgUnitId UUID подразделения (опционально)
     * @param itemId UUID номенклатуры ВИ (опционально)
     * @param from Дата окончания срока носки: с (включительно)
     * @param to Дата окончания срока носки: по (включительно)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageEmployeeWearReportRowDto OK
     * @throws ApiError
     */
    public static searchEmployeeWearReportPage(
        organizationId: string,
        orgUnitId?: string,
        itemId?: string,
        from?: string,
        to?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageEmployeeWearReportRowDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/wear-report/page',
            query: {
                'organizationId': organizationId,
                'orgUnitId': orgUnitId,
                'itemId': itemId,
                'from': from,
                'to': to,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Пагинированный список норм обеспечения ВИ
     * Возвращает список норм обеспечения с возможностью фильтрации:
     * - по организации,
     * - по категории сотрудника,
     * - по сезону,
     * - по строковому поиску (код/наименование).
     *
     * @param organizationId UUID организации
     * @param employeeCategory Категория сотрудника (например, 'ОФИЦЕР')
     * @param season Сезон применения нормы
     * @param search Поиск по коду/наименованию (подстрока)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageProvisionNormDto OK
     * @throws ApiError
     */
    public static searchProvisionNormsPage(
        organizationId?: string,
        employeeCategory?: string,
        season?: 'ALL' | 'SUMMER' | 'WINTER' | 'DEMISEASON',
        search?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageProvisionNormDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/provision-norms/page',
            query: {
                'organizationId': organizationId,
                'employeeCategory': employeeCategory,
                'season': season,
                'search': search,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Отчёт обеспеченности сотрудника ВИ
     * Возвращает детализированный отчёт по обеспеченности конкретного сотрудника вещевым имуществом.
     * Расчёт производится на основе:
     * - выбранной нормы обеспечения (определяется по организации, категории и сезону),
     * - фактически выданного ВИ (EmployeeItemAssignment, только активные записи).
     *
     * Для выбора нормы используется приоритет (поле priority) и методы репозитория норм.
     *
     * @param employeeId UUID сотрудника
     * @param employeeCategory Категория сотрудника (например, 'ОФИЦЕР'). Опционально, но повышает точность подбора нормы.
     * @param season Сезон применения нормы (ALL/SUMMER/WINTER/DEMISEASON). Опционально.
     * @returns EmployeeProvisionReportDto OK
     * @throws ApiError
     */
    public static analyzeEmployeeProvision(
        employeeId: string,
        employeeCategory?: string,
        season?: 'ALL' | 'SUMMER' | 'WINTER' | 'DEMISEASON',
    ): CancelablePromise<EmployeeProvisionReportDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/provision-analysis/by-employee/{employeeId}',
            path: {
                'employeeId': employeeId,
            },
            query: {
                'employeeCategory': employeeCategory,
                'season': season,
            },
        });
    }
    /**
     * Пагинированный поиск физических лиц
     * Поиск по подстроке фамилии и имени (регистр не учитывается).
     * @param lastName Фильтр по фамилии (подстрока)
     * @param firstName Фильтр по имени (подстрока)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PagePersonDto OK
     * @throws ApiError
     */
    public static searchPersonsPage(
        lastName?: string,
        firstName?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PagePersonDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/persons/page',
            query: {
                'lastName': lastName,
                'firstName': firstName,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Получить сотрудника по идентификатору
     * Возвращает карточку сотрудника с привязкой к физическому лицу, организации и подразделению.
     * @param id UUID сотрудника
     * @returns EmployeeDto OK
     * @throws ApiError
     */
    public static getEmployeeById(
        id: string,
    ): CancelablePromise<EmployeeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/employees/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Мягкое удаление сотрудника
     * Выполняет soft delete записи сотрудника. Используется для логического удаления с сохранением
     * истории в базе данных.
     *
     * @param id UUID сотрудника
     * @returns any OK
     * @throws ApiError
     */
    public static deleteEmployee(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/hr/employees/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Карточка обеспеченности сотрудника ВИ
     * Возвращает карточку обеспеченности конкретного сотрудника:
     * - применённая норма обеспечения (код, наименование, сезон);
     * - по каждой номенклатуре: сколько положено по норме, сколько фактически выдано,
     * есть ли недостача или избыток, даты выдач и плановых возвратов.
     *
     * Если normId не указан, система пытается подобрать подходящую норму
     * по организации, категории сотрудника и сезону.
     *
     * @param id UUID сотрудника
     * @param normId UUID нормы обеспечения (если указать явно)
     * @param season Сезон применения нормы (если normId не указан)
     * @param employeeCategory Категория сотрудника (например, 'ОФИЦЕР'). Если не указана, может быть определена организацией вручную.
     * @returns EmployeeProvisionCardDto OK
     * @throws ApiError
     */
    public static getEmployeeProvisionCard(
        id: string,
        normId?: string,
        season?: 'ALL' | 'SUMMER' | 'WINTER' | 'DEMISEASON',
        employeeCategory?: string,
    ): CancelablePromise<EmployeeProvisionCardDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/employees/{id}/provision-card',
            path: {
                'id': id,
            },
            query: {
                'normId': normId,
                'season': season,
                'employeeCategory': employeeCategory,
            },
        });
    }
    /**
     * История кадровых событий сотрудника
     * Возвращает хронологию событий сотрудника:
     * приём, перемещения, увольнение.
     *
     * @param id UUID сотрудника
     * @returns EmployeeStatusEventDto OK
     * @throws ApiError
     */
    public static getEmployeeHistory(
        id: string,
    ): CancelablePromise<Array<EmployeeStatusEventDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/employees/{id}/history',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Пагинированный список сотрудников
     * Возвращает страницу сотрудников с возможностью фильтрации по организации, подразделению
     * и табельному номеру.
     *
     * @param organizationId UUID организации
     * @param orgUnitId UUID подразделения
     * @param personnelNumber Фильтр по табельному номеру (подстрока)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageEmployeeDto OK
     * @throws ApiError
     */
    public static searchEmployeesPage(
        organizationId?: string,
        orgUnitId?: string,
        personnelNumber?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageEmployeeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/employees/page',
            query: {
                'organizationId': organizationId,
                'orgUnitId': orgUnitId,
                'personnelNumber': personnelNumber,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Получить документ возврата ВИ по идентификатору
     * Возвращает основные реквизиты документа возврата ВИ.
     * @param id UUID документа
     * @returns EmployeeReturnDocumentDto OK
     * @throws ApiError
     */
    public static getEmployeeReturnDocumentById(
        id: string,
    ): CancelablePromise<EmployeeReturnDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/employee-returns/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Мягко удалить документ возврата ВИ
     * Допускается только для документов в статусе DRAFT.
     * Выполняется логическое удаление (soft delete) с сохранением истории в БД.
     *
     * @param id UUID документа
     * @returns any OK
     * @throws ApiError
     */
    public static deleteEmployeeReturnDocument(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/hr/employee-returns/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Пагинированный список документов возврата ВИ
     * Возвращает список документов возврата ВИ с фильтром по организации и периоду.
     * Показываются документы в статусах DRAFT и POSTED.
     *
     * @param organizationId UUID организации
     * @param from Дата с (включительно)
     * @param to Дата по (включительно)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageEmployeeReturnDocumentDto OK
     * @throws ApiError
     */
    public static searchEmployeeReturnDocumentsPage(
        organizationId: string,
        from?: string,
        to?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageEmployeeReturnDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/employee-returns/page',
            query: {
                'organizationId': organizationId,
                'from': from,
                'to': to,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Получить документ выдачи ВИ по идентификатору
     * Возвращает основные реквизиты документа выдачи ВИ.
     * @param id UUID документа
     * @returns EmployeeIssueDocumentDto OK
     * @throws ApiError
     */
    public static getEmployeeIssueDocumentById(
        id: string,
    ): CancelablePromise<EmployeeIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/employee-issues/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Мягко удалить документ выдачи ВИ
     * Допускается только для документов в статусе DRAFT.
     * Выполняется логическое удаление (soft delete) с сохранением истории в базе.
     *
     * @param id UUID документа
     * @returns any OK
     * @throws ApiError
     */
    public static deleteEmployeeIssueDocument(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/hr/employee-issues/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Пагинированный список документов выдачи ВИ
     * Возвращает список документов выдачи ВИ с фильтром по организации и периоду.
     * Показываются документы в статусах DRAFT и POSTED.
     *
     * @param organizationId UUID организации
     * @param from Дата с (включительно)
     * @param to Дата по (включительно)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageEmployeeIssueDocumentDto OK
     * @throws ApiError
     */
    public static searchEmployeeIssueDocumentsPage(
        organizationId: string,
        from?: string,
        to?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageEmployeeIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/employee-issues/page',
            query: {
                'organizationId': organizationId,
                'from': from,
                'to': to,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Получить конкретное закрепление ВИ
     * Возвращает одну запись закрепления ВИ по идентификатору.
     * @param id UUID закрепления ВИ
     * @returns EmployeeItemAssignmentDto OK
     * @throws ApiError
     */
    public static getEmployeeItemAssignmentById(
        id: string,
    ): CancelablePromise<EmployeeItemAssignmentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/employee-assignments/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Пагинированный отчёт по обеспеченности ВИ
     * Возвращает список закреплений ВИ с фильтром по организации (обязательно),
     * опционально по подразделению и номенклатуре.
     * По умолчанию выводятся только активные закрепления (active=true).
     *
     * @param organizationId UUID организации (обязательно)
     * @param orgUnitId UUID подразделения (опционально)
     * @param itemId UUID номенклатуры (опционально)
     * @param active Показывать только активные закрепления (по умолчанию true)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageEmployeeItemAssignmentDto OK
     * @throws ApiError
     */
    public static searchEmployeeItemAssignmentsPage(
        organizationId: string,
        orgUnitId?: string,
        itemId?: string,
        active?: boolean,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageEmployeeItemAssignmentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/employee-assignments/page',
            query: {
                'organizationId': organizationId,
                'orgUnitId': orgUnitId,
                'itemId': itemId,
                'active': active,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Карточка обеспеченности сотрудника
     * Возвращает список активных закреплений ВИ за указанным сотрудником:
     * номенклатура, склад, количество, дата выдачи, срок носки, категория и источник финансирования.
     *
     * @param employeeId UUID сотрудника
     * @returns EmployeeItemAssignmentDto OK
     * @throws ApiError
     */
    public static getEmployeeItemAssignmentsByEmployee(
        employeeId: string,
    ): CancelablePromise<Array<EmployeeItemAssignmentDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/hr/employee-assignments/by-employee/{employeeId}',
            path: {
                'employeeId': employeeId,
            },
        });
    }
    /**
     * Пагинированный список документов списания по складу
     * Возвращает страницу документов списания ВИ в разрезе склада
     * с возможностью фильтрации по диапазону дат и статусу документа.
     *
     * @param warehouseId UUID склада
     * @param from Дата с (включительно)
     * @param to Дата по (включительно)
     * @param status Статус документа (DRAFT / POSTED / CANCELLED)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageWriteOffDocumentDto OK
     * @throws ApiError
     */
    public static searchWriteOffDocumentsByWarehousePage(
        warehouseId: string,
        from?: string,
        to?: string,
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageWriteOffDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/writeoff/page/by-warehouse',
            query: {
                'warehouseId': warehouseId,
                'from': from,
                'to': to,
                'status': status,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Пагинированный список документов временной выдачи по складу
     * Возвращает страницу документов временной выдачи ВИ в разрезе склада
     * с фильтрацией по диапазону дат и статусу документа.
     *
     * @param warehouseId UUID склада
     * @param from Дата с (включительно)
     * @param to Дата по (включительно)
     * @param status Статус документа (DRAFT / POSTED / CANCELLED)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageTemporaryIssueDocumentDto OK
     * @throws ApiError
     */
    public static searchTemporaryIssueDocumentsByWarehousePage(
        warehouseId: string,
        from?: string,
        to?: string,
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageTemporaryIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/temporary-issue/page/by-warehouse',
            query: {
                'warehouseId': warehouseId,
                'from': from,
                'to': to,
                'status': status,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Пагинированный список документов временной выдачи по сотруднику
     * Используется для просмотра истории выдачи ВИ во временное пользование конкретному сотруднику.
     * @param employeeId UUID сотрудника
     * @param from Дата с (включительно)
     * @param to Дата по (включительно)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageTemporaryIssueDocumentDto OK
     * @throws ApiError
     */
    public static searchTemporaryIssueDocumentsByEmployeePage(
        employeeId: string,
        from?: string,
        to?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageTemporaryIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/temporary-issue/page/by-employee',
            query: {
                'employeeId': employeeId,
                'from': from,
                'to': to,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Пагинированный список документов возврата по складу
     * Возвращает страницу документов возврата ВИ в разрезе склада
     * с возможностью фильтрации по диапазону дат и статусу документа.
     *
     * @param warehouseId UUID склада
     * @param from Дата с (включительно)
     * @param to Дата по (включительно)
     * @param status Статус документа (DRAFT / POSTED / CANCELLED)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageReturnDocumentDto OK
     * @throws ApiError
     */
    public static searchReturnDocumentsByWarehousePage(
        warehouseId: string,
        from?: string,
        to?: string,
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageReturnDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/return/page/by-warehouse',
            query: {
                'warehouseId': warehouseId,
                'from': from,
                'to': to,
                'status': status,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Пагинированный список документов возврата по сотруднику
     * Возвращает страницу документов возврата ВИ для конкретного сотрудника
     * за указанный период. Можно использовать для анализа истории обеспечения.
     *
     * @param employeeId UUID сотрудника
     * @param from Дата с (включительно)
     * @param to Дата по (включительно)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageReturnDocumentDto OK
     * @throws ApiError
     */
    public static searchReturnDocumentsByEmployeePage(
        employeeId: string,
        from?: string,
        to?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageReturnDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/return/page/by-employee',
            query: {
                'employeeId': employeeId,
                'from': from,
                'to': to,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Поиск приказов по складу
     * Возвращает страницу приказов о замене вещей по складу.
     * Можно фильтровать по периоду дат документа и статусу.
     *
     * @param warehouseId Идентификатор склада
     * @param pageable
     * @param fromDate Дата 'с' (включительно)
     * @param toDate Дата 'по' (включительно)
     * @param status Статус документа (опционально)
     * @returns Page Список приказов найден
     * @throws ApiError
     */
    public static searchReplacementOrdersByWarehouse(
        warehouseId: string,
        pageable: Pageable,
        fromDate?: string,
        toDate?: string,
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
    ): CancelablePromise<Page> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/replacement-orders/by-warehouse/{warehouseId}',
            path: {
                'warehouseId': warehouseId,
            },
            query: {
                'fromDate': fromDate,
                'toDate': toDate,
                'status': status,
                'pageable': pageable,
            },
        });
    }
    /**
     * Поиск приказов по сотруднику
     * Возвращает страницу приказов о замене вещей для конкретного сотрудника за выбранный период.
     * @param employeeId Идентификатор сотрудника
     * @param pageable
     * @param fromDate Дата 'с' (включительно)
     * @param toDate Дата 'по' (включительно)
     * @returns Page Список приказов найден
     * @throws ApiError
     */
    public static searchReplacementOrdersByEmployee(
        employeeId: string,
        pageable: Pageable,
        fromDate?: string,
        toDate?: string,
    ): CancelablePromise<Page> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/replacement-orders/by-employee/{employeeId}',
            path: {
                'employeeId': employeeId,
            },
            query: {
                'fromDate': fromDate,
                'toDate': toDate,
                'pageable': pageable,
            },
        });
    }
    /**
     * Пагинированный список документов прихода
     * Возвращает страницу документов прихода с возможностью фильтрации по складу, статусу и диапазону дат.
     * По умолчанию отдаются все документы без фильтрации.
     *
     * @param warehouseId UUID склада, по которому фильтровать документы
     * @param status Статус документа (DRAFT, POSTED, CANCELLED)
     * @param fromDate Дата документа с (включительно)
     * @param toDate Дата документа по (включительно)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageReceiptDocumentDto OK
     * @throws ApiError
     */
    public static searchReceiptDocumentsPage(
        warehouseId?: string,
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
        fromDate?: string,
        toDate?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageReceiptDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/receipts/page',
            query: {
                'warehouseId': warehouseId,
                'status': status,
                'fromDate': fromDate,
                'toDate': toDate,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Пагинированный список актов приема качественного состояния
     * Возвращает страницу актов с возможностью фильтрации по складу, диапазону дат,
     * статусу документа и номеру акта.
     *
     * @param warehouseId UUID склада
     * @param from Дата с (включительно)
     * @param to Дата по (включительно)
     * @param status Статус акта (DRAFT / POSTED / CANCELLED)
     * @param docNumber Поиск по номеру акта (подстрока)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageQualityAcceptanceDocumentDto OK
     * @throws ApiError
     */
    public static searchQualityAcceptanceDocumentsPage(
        warehouseId?: string,
        from?: string,
        to?: string,
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
        docNumber?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageQualityAcceptanceDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/quality-acceptance/page',
            query: {
                'warehouseId': warehouseId,
                'from': from,
                'to': to,
                'status': status,
                'docNumber': docNumber,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Поиск документов перемещения по складу-получателю
     * Возвращает страницу документов перемещения, где указанный склад является получателем.
     * Можно фильтровать по периоду и статусу документа.
     *
     * @param warehouseId Идентификатор склада-получателя
     * @param pageable
     * @param fromDate Дата 'с' (включительно)
     * @param toDate Дата 'по' (включительно)
     * @param status Статус документа (опционально)
     * @returns Page Список документов найден
     * @throws ApiError
     */
    public static searchMovementDocumentsByToWarehouse(
        warehouseId: string,
        pageable: Pageable,
        fromDate?: string,
        toDate?: string,
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
    ): CancelablePromise<Page> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/movements/to-warehouse/{warehouseId}',
            path: {
                'warehouseId': warehouseId,
            },
            query: {
                'fromDate': fromDate,
                'toDate': toDate,
                'status': status,
                'pageable': pageable,
            },
        });
    }
    /**
     * Поиск документов перемещения по складу-отправителю
     * Возвращает страницу документов перемещения, где указанный склад является отправителем.
     * Можно фильтровать по периоду дат и статусу документа.
     *
     * @param warehouseId Идентификатор склада-отправителя
     * @param pageable
     * @param fromDate Дата 'с' (включительно)
     * @param toDate Дата 'по' (включительно)
     * @param status Статус документа (опционально)
     * @returns Page Список документов найден
     * @throws ApiError
     */
    public static searchMovementDocumentsByFromWarehouse(
        warehouseId: string,
        pageable: Pageable,
        fromDate?: string,
        toDate?: string,
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
    ): CancelablePromise<Page> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/movements/from-warehouse/{warehouseId}',
            path: {
                'warehouseId': warehouseId,
            },
            query: {
                'fromDate': fromDate,
                'toDate': toDate,
                'status': status,
                'pageable': pageable,
            },
        });
    }
    /**
     * Пагинированный список документов выдачи по складу
     * Возвращает страницу документов выдачи ВИ в разрезе склада
     * с возможностью фильтрации по диапазону дат и статусу документа.
     *
     * @param warehouseId UUID склада
     * @param from Дата с (включительно)
     * @param to Дата по (включительно)
     * @param status Статус документа (DRAFT / POSTED / CANCELLED)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageIssueDocumentDto OK
     * @throws ApiError
     */
    public static searchIssueDocumentsByWarehousePage(
        warehouseId: string,
        from?: string,
        to?: string,
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/issue/page/by-warehouse',
            query: {
                'warehouseId': warehouseId,
                'from': from,
                'to': to,
                'status': status,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Пагинированный список документов выдачи по сотруднику
     * Возвращает страницу документов выдачи ВИ для конкретного сотрудника
     * за указанный период. Может использоваться для формирования арматурной карточки.
     *
     * @param employeeId UUID сотрудника
     * @param from Дата с (включительно)
     * @param to Дата по (включительно)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageIssueDocumentDto OK
     * @throws ApiError
     */
    public static searchIssueDocumentsByEmployeePage(
        employeeId: string,
        from?: string,
        to?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageIssueDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/issue/page/by-employee',
            query: {
                'employeeId': employeeId,
                'from': from,
                'to': to,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Пагинированный список документов оприходования излишков
     * Возвращает страницу документов оприходования с возможностью фильтрации по складу,
     * диапазону дат, статусу документа и номеру.
     *
     * @param warehouseId UUID склада
     * @param from Дата с (включительно)
     * @param to Дата по (включительно)
     * @param status Статус документа (DRAFT / POSTED / CANCELLED)
     * @param docNumber Поиск по номеру документа (подстрока)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageInventorySurplusDocumentDto OK
     * @throws ApiError
     */
    public static searchInventorySurplusDocumentsPage(
        warehouseId?: string,
        from?: string,
        to?: string,
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
        docNumber?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageInventorySurplusDocumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/inventory-surplus/page',
            query: {
                'warehouseId': warehouseId,
                'from': from,
                'to': to,
                'status': status,
                'docNumber': docNumber,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Поиск документов инвентаризации по складу
     * Возвращает страницу документов инвентаризации для указанного склада.
     * Можно фильтровать по периоду дат и статусу документа.
     *
     * @param warehouseId Идентификатор склада
     * @param pageable
     * @param fromDate Дата 'с' (включительно)
     * @param toDate Дата 'по' (включительно)
     * @param status Статус документа (опционально)
     * @returns Page Список документов найден
     * @throws ApiError
     */
    public static searchInventoryDocumentsByWarehouse(
        warehouseId: string,
        pageable: Pageable,
        fromDate?: string,
        toDate?: string,
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
    ): CancelablePromise<Page> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/inventories/by-warehouse/{warehouseId}',
            path: {
                'warehouseId': warehouseId,
            },
            query: {
                'fromDate': fromDate,
                'toDate': toDate,
                'status': status,
                'pageable': pageable,
            },
        });
    }
    /**
     * Сводный дашборд по складу и обеспеченности
     * @returns ConsolidatedDashboardDto OK
     * @throws ApiError
     */
    public static getConsolidationDashboard(): CancelablePromise<ConsolidatedDashboardDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/consolidation/dashboard',
        });
    }
    /**
     * Пагинированный поиск пользователей
     * Возвращает страницу пользователей с фильтрацией по логину и ролям.
     * По умолчанию выбираются только неудалённые пользователи (deleted = false).
     * Параметр roles можно указать несколько раз: ?roles=ADMIN&roles=WAREHOUSE_MANAGER.
     *
     * @param username Фильтр по логину (подстрока, регистр не учитывается)
     * @param roles Коды ролей для фильтрации (можно указать несколько значений roles)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageUserDto OK
     * @throws ApiError
     */
    public static adminSearchUsersPage(
        username?: string,
        roles?: Array<string>,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/users/page',
            query: {
                'username': username,
                'roles': roles,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
    /**
     * Получить настройку по ID
     * @param id
     * @returns SystemSettingDto OK
     * @throws ApiError
     */
    public static adminGetSystemSettingById(
        id: string,
    ): CancelablePromise<SystemSettingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/settings/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Удалить (soft delete) системную настройку
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static adminDeleteSystemSetting(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/settings/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Получить настройку по ключу
     * @param key
     * @returns SystemSettingDto OK
     * @throws ApiError
     */
    public static adminGetSystemSettingByKey(
        key: string,
    ): CancelablePromise<SystemSettingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/settings/by-key/{key}',
            path: {
                'key': key,
            },
        });
    }
    /**
     * Глобальный поиск по основным сущностям системы
     * @param q Строка поиска
     * @param limitPerType Лимит результатов на тип сущности (по умолчанию 10)
     * @returns AdminSearchResultDto OK
     * @throws ApiError
     */
    public static adminGlobalSearch(
        q: string,
        limitPerType: number = 10,
    ): CancelablePromise<Array<AdminSearchResultDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/search',
            query: {
                'q': q,
                'limitPerType': limitPerType,
            },
        });
    }
    /**
     * Поиск по журналу аудита
     * Позволяет администратору просматривать события аудита с фильтрацией по всем основным полям.
     * @param userId ID пользователя, совершившего действие
     * @param username Имя пользователя (поиск по подстроке, регистр не важен)
     * @param action Тип действия (например, CREATE_ORG, UPDATE_USER и т.п.)
     * @param entityType Тип сущности (например, Organization, User, Warehouse)
     * @param entityId ID сущности, по которой было действие
     * @param from Дата/время 'с' (UTC), ISO8601, например 2025-01-01T00:00:00Z
     * @param to Дата/время 'по' (UTC), ISO8601
     * @param text Поиск по тексту (username, action, entityType, details)
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PageAuditLogDto OK
     * @throws ApiError
     */
    public static adminSearchAuditLogs(
        userId?: string,
        username?: string,
        action?: string,
        entityType?: string,
        entityId?: string,
        from?: string,
        to?: string,
        text?: string,
        page?: any,
        size?: any,
        sort?: Array<any>,
    ): CancelablePromise<PageAuditLogDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/audit/logs',
            query: {
                'userId': userId,
                'username': username,
                'action': action,
                'entityType': entityType,
                'entityId': entityId,
                'from': from,
                'to': to,
                'text': text,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }
}
