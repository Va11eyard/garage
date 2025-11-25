import {AuthControllerService} from "@/shared//api/generated/__swagger_client";
import type { LoginRequest, JwtResponse} from "@/shared//api/generated/__swagger_client";

export class AuthLogoutService {
    async logout(): Promise<void> {
        localStorage.removeItem("auth_token");
        document.cookie = "auth_token=; path=/; max_age=0";
    }
}