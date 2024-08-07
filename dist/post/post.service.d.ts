import { PrismaService } from "../prisma.service";
import { UpdatePostDto } from "./dto/update-post.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { FilesService } from "../files/files.service";
export declare class PostService {
    private prisma;
    private readonly filesService;
    constructor(prisma: PrismaService, filesService: FilesService);
    getAllPosts(): Promise<{
        id: number;
        name: string;
        description: string | null;
        image: string;
        category: string;
    }[]>;
    createPost(createPostDto: CreatePostDto, file: Express.Multer.File): Promise<any>;
    deletePost(id: string): Promise<{
        message: string;
    }>;
    getById(id: string): Promise<{
        id: number;
        name: string;
        description: string | null;
        image: string;
        category: string;
    }>;
    changePost(id: string, updatePostDto: UpdatePostDto, file: Express.Multer.File): Promise<{
        id: number;
        name: string;
        description: string | null;
        image: string;
        category: string;
    }>;
}
