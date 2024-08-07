import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PostDto {
  @ApiProperty({
    description: "Название товара",
    example: "Стул",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Описание товара",
    example: "Отличный стул",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Ссылка на изоброжение",
    example:
      "http://localhost:4000/uploads/50b0d3fa-d1b9-4ed9-88b5-7787fba56356.png",
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: "Категория",
    example: "furniture | tech | glass",
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
