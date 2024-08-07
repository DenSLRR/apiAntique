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
exports.PostDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class PostDto {
}
exports.PostDto = PostDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Название товара",
        example: "Стул",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Описание товара",
        example: "Отличный стул",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Ссылка на изоброжение",
        example: "http://localhost:4000/uploads/50b0d3fa-d1b9-4ed9-88b5-7787fba56356.png",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Категория",
        example: "furniture | tech | glass",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PostDto.prototype, "category", void 0);
//# sourceMappingURL=post.dto.js.map