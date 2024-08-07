import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { PrismaService } from "../prisma.service";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  controllers: [FilesController],
  providers: [FilesService, PrismaService],
  imports: [MulterModule],
  exports: [FilesService],
})
export class FilesModule {}
