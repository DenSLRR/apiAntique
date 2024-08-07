import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import * as path from "node:path";
import { v4 as uuidv4 } from "uuid";
import * as fs from "node:fs";

@Injectable()
export class FilesService {
  private readonly uploadPath = path.resolve(__dirname, "../../uploads");

  constructor(private prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new Error("No file provided");
    }
    const filename = `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = path.join(this.uploadPath, filename);
    fs.writeFileSync(filePath, file.buffer);

    return `http://localhost:4000/uploads/${filename}`;
  }

  async updatePostWitchId(id: string, imageUrl: string): Promise<any> {
    const post = await this.prisma.post.findUnique({
      where: { id: +id },
    });
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    await this.prisma.post.update({
      where: { id: +id },
      data: { image: imageUrl },
    });
  }
}
