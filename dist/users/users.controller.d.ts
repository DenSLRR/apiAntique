import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(body: {
        email: string;
        password: string;
    }): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
}
