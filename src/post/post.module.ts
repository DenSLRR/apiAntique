import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { PrismaService } from "../prisma.service";
import { FilesModule } from "../files/files.module";

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
  imports: [FilesModule],
})
export class PostModule {}
