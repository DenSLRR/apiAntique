import { PrismaService } from "../prisma.service";
export declare class FilesService {
    private prisma;
    private readonly uploadPath;
    constructor(prisma: PrismaService);
    uploadFile(file: Express.Multer.File): Promise<any>;
    updatePostWitchId(id: string, imageUrl: string): Promise<any>;
}
