import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PostService } from "./post.service";

import { PostDto } from "./dto/post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Посты")
@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: "Получить все посты" })
  @ApiOkResponse({ type: [PostDto] })
  async getPosts() {
    return this.postService.getAllPosts();
  }

  @Post("/create")
  @UseInterceptors(FileInterceptor("image"))
  @ApiOperation({ summary: "Создание поста" })
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreatePostDto,
    description: "Создать пост и добавить фото",
    required: true,
  })
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postService.createPost(createPostDto, file);
  }

  @Get(":id")
  @ApiBody({
    type: PostDto,
    description: "Получить пост по его id",
    required: true,
  })
  @ApiOkResponse({type: PostDto})
  @ApiOperation({ summary: "Получить один пост по его id" })
  async getPostById(@Param("id") id: string) {
    return this.postService.getById(id);
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("image"))
  @ApiOperation({ summary: "Изменить пост" })
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: UpdatePostDto,
    description: "Изменить уже существующий пост",
    required: true,
  })
  async changePost(
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postService.changePost(id, updatePostDto, file);
  }

  @Delete("/delete/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: PostDto,
    description: "Удалить пост по его id",
    required: true,
  })
  @ApiOperation({ summary: "Удалить пост по его id" })
  async deletePost(@Param("id") id: string) {
    return this.postService.deletePost(id);
  }
}
