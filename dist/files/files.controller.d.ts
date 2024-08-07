import { FilesService } from "./files.service";
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: any;
    }>;
    updatePostImage(id: string, imageUrl: string): Promise<{
        message: string;
    }>;
}
