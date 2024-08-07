import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt"; // Убедитесь, что bcrypt установлен

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const envEmail = this.configService.get<string>("USER_EMAIL");
    const oldPass = this.configService.get<string>("USER_PASSWORD");
    const hashedPassword = await bcrypt.hash(password, 10);

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (email === envEmail && passwordMatch) {
      return { username: email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
