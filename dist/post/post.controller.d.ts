import { PostService } from "./post.service";
import { UpdatePostDto } from "./dto/update-post.dto";
import { CreatePostDto } from "./dto/create-post.dto";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getPosts(): Promise<{
        id: number;
        name: string;
        description: string | null;
        image: string;
        category: string;
    }[]>;
    createPost(createPostDto: CreatePostDto, file: Express.Multer.File): Promise<any>;
    getPostById(id: string): Promise<{
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
    deletePost(id: string): Promise<{
        message: string;
    }>;
}
