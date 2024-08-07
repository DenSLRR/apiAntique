import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.filesService.uploadFile(file);
    return { url: fileUrl };
  }
  @Patch("update-post/:id")
  async updatePostImage(
    @Param("id") id: string,
    @Body("image") imageUrl: string,
  ) {
    await this.filesService.updatePostWitchId(id, imageUrl);
    return { message: "Post updated with image" };
  }
}
