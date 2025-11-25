'use client'

import {useMutation} from "@tanstack/react-query";
import {AuthControllerService, type LoginRequest, type JwtResponse} from "@/shared//api/generated/__swagger_client";
import {setAuthToken} from "@/shared//api/config";

export function useLogin() {
    return useMutation<JwtResponse, Error, LoginRequest>({
        mutationFn: async (credentials: LoginRequest) => {
            try {
                const response = await AuthControllerService.login(credentials)

                if (response.token != null) {
                    localStorage.setItem('auth_token', response.token)
                    setAuthToken(response.token)
                }
                if (response.roles != null) {
                    localStorage.setItem('user_roles', JSON.stringify(response.roles))
                }
                if (response.username != null) {
                    localStorage.setItem('username', response.username)
                }
                return response
            } catch (error: any) {
                // Transform API errors into more user-friendly messages
                if (error.status === 401 || error.statusCode === 401) {
                    throw new Error('Неверный логин или пароль')
                } else if (error.status === 403 || error.statusCode === 403) {
                    throw new Error('Доступ запрещен')
                } else if (error.status === 500 || error.statusCode === 500) {
                    throw new Error('Неверный логин или пароль')
                }
                throw error
            }
        }
    })
}