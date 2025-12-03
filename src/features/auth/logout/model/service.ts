export class AuthLogoutService {
    async logout(): Promise<void> {
        localStorage.removeItem("auth_token");
        document.cookie = "auth_token=; path=/; max_age=0";
    }
}