import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { CreatePostDto } from "../post/dto/create-post.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Авторизация" })
  async login(@Body() { password, email }: LoginDto) {
    const user = await this.authService.validateUser(email, password);
    if (user) {
      return this.authService.login(user);
    }
    return { message: "Неверный логин или пароль!" };
  }
}
