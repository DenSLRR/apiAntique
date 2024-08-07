"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const files_service_1 = require("../files/files.service");
const fs = require("node:fs");
const path = require("node:path");
const post_constants_1 = require("./post.constants");
let PostService = class PostService {
    constructor(prisma, filesService) {
        this.prisma = prisma;
        this.filesService = filesService;
    }
    async getAllPosts() {
        return this.prisma.post.findMany();
    }
    async createPost(createPostDto, file) {
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
    async deletePost(id) {
        const post = await this.getById(id);
        if (post.image) {
            const filePath = path.join(__dirname, "../../uploads", path.basename(post.image));
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        await this.prisma.post.delete({
            where: { id: +id },
        });
        return { message: "successfully deleted" };
    }
    async getById(id) {
        const post = await this.prisma.post.findUnique({
            where: { id: +id },
        });
        if (!post)
            throw new common_1.NotFoundException(post_constants_1.ERROR.POST_NOT_FOUND);
        return post;
    }
    async changePost(id, updatePostDto, file) {
        const post = await this.getById(id);
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
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        files_service_1.FilesService])
], PostService);
//# sourceMappingURL=post.service.js.map