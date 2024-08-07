import { PrismaService } from "../prisma.service";
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(email: string, password: string): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
    }[]>;
}
