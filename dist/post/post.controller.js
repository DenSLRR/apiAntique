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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_dto_1 = require("./dto/post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const create_post_dto_1 = require("./dto/create-post.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async getPosts() {
        return this.postService.getAllPosts();
    }
    async createPost(createPostDto, file) {
        return this.postService.createPost(createPostDto, file);
    }
    async getPostById(id) {
        return this.postService.getById(id);
    }
    async changePost(id, updatePostDto, file) {
        return this.postService.changePost(id, updatePostDto, file);
    }
    async deletePost(id) {
        return this.postService.deletePost(id);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Получить все посты" }),
    (0, swagger_1.ApiOkResponse)({ type: [post_dto_1.PostDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image")),
    (0, swagger_1.ApiOperation)({ summary: "Создание поста" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBody)({
        type: create_post_dto_1.CreatePostDto,
        description: "Создать пост и добавить фото",
        required: true,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiBody)({
        type: post_dto_1.PostDto,
        description: "Получить пост по его id",
        required: true,
    }),
    (0, swagger_1.ApiOkResponse)({ type: post_dto_1.PostDto }),
    (0, swagger_1.ApiOperation)({ summary: "Получить один пост по его id" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image")),
    (0, swagger_1.ApiOperation)({ summary: "Изменить пост" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBody)({
        type: update_post_dto_1.UpdatePostDto,
        description: "Изменить уже существующий пост",
        required: true,
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "changePost", null);
__decorate([
    (0, common_1.Delete)("/delete/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBody)({
        type: post_dto_1.PostDto,
        description: "Удалить пост по его id",
        required: true,
    }),
    (0, swagger_1.ApiOperation)({ summary: "Удалить пост по его id" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
exports.PostController = PostController = __decorate([
    (0, swagger_1.ApiTags)("Посты"),
    (0, common_1.Controller)("posts"),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map