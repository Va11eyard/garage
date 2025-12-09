/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JwtResponse } from '../models/JwtResponse';
import type { LoginRequest } from '../models/LoginRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class JwtService {
    /**
     * Аутентификация и получение JWT-токена
     * Проверяет логин и пароль пользователя, а при успешной аутентификации
     * возвращает JWT-токен, идентификатор пользователя и список его ролей.
     *
     * Токен далее используется в заголовке Authorization: Bearer &lt;token&gt;
     * для доступа к защищённым эндпоинтам.
     *
     * @param requestBody
     * @returns JwtResponse OK
     * @throws ApiError
     */
    public static login(
        requestBody: LoginRequest,
    ): CancelablePromise<JwtResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
