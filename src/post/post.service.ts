import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../prisma.service";
import { UpdatePostDto } from "./dto/update-post.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { FilesService } from "../files/files.service";
import * as fs from "node:fs";
import * as path from "node:path";
import { PostDto } from "./dto/post.dto";
import {ERROR} from "./post.constants";

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private readonly filesService: FilesService,
  ) {}

  async getAllPosts() {
    return this.prisma.post.findMany();
  }

  async createPost(
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
  ): Promise<any> {
    const imageUrl = file ? await this.filesService.uploadFile(file) : null;
    const post = await this.prisma.post.create({
      data: {
        name: createPostDto.name,
        description: createPostDto.description,
        image: imageUrl,
        category: createPostDto.category,
      },
    });
    return post;
  }

  async deletePost(id: string) {
    const post = await this.getById(id)

    if (post.image) {
      const filePath = path.join(
        __dirname,
        "../../uploads",
        path.basename(post.image),
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await this.prisma.post.delete({
      where: { id: +id },
    });
    return { message: "successfully deleted" };
  }

  async getById(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: +id },
    });
    if (!post) throw new NotFoundException(ERROR.POST_NOT_FOUND);

    return post;
  }

  async changePost(
    id: string,
    updatePostDto: UpdatePostDto,
    file: Express.Multer.File,
  ) {
    const post = await this.getById(id)
    const imageUrl = file
      ? await this.filesService.uploadFile(file)
      : post.image;

    const updatedPost = await this.prisma.post.update({
      where: { id: +id },
      data: {
        name: updatePostDto.name || post.name,
        description: updatePostDto.description || post.description,
        image: imageUrl,
      },
    });
    return updatedPost;
  }
}
