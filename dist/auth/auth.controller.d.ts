import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ password, email }: LoginDto): Promise<{
        access_token: string;
    } | {
        message: string;
    }>;
}
