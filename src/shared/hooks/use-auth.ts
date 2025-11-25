'use client'

import { useState, useEffect } from 'react'
import { clearAuthToken, setAuthToken } from '@/shared/api/config'

export function useAuth() {
    const [token, setTokenState] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token')
        if (storedToken) {
            setTokenState(storedToken)
            setIsAuthenticated(true)
            setAuthToken(storedToken)
        }
    }, [])

    const login = (newToken: string) => {
        localStorage.setItem('auth_token', newToken)
        setTokenState(newToken)
        setIsAuthenticated(true)
        setAuthToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem('auth_token')
        document.cookie = 'auth_token=; path=/; max-age=0'
        setTokenState(null)
        setIsAuthenticated(false)
        clearAuthToken()
    }

    return { token, isAuthenticated, login, logout }
}
