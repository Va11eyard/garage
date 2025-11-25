import {AuthControllerService} from "@/shared//api/generated/__swagger_client";
import type { LoginRequest, JwtResponse} from "@/shared//api/generated/__swagger_client";

export class AuthLoginService {
    async login(credentials: LoginRequest): Promise<JwtResponse> {
        return AuthControllerService.login(credentials)
    }
}