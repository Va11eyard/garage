import type { LoginRequest, JwtResponse} from "@/shared/api/generated/__swagger_client";

export class AuthLoginService {
    async login(credentials: LoginRequest): Promise<JwtResponse> {
        // TODO: Replace with actual API call when authentication endpoint is available
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
        return response.json()
    }
}