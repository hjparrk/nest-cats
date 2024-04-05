import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDTO } from 'src/common/dto/login.request.dto';
import { CatRepository } from 'src/common/repositories/cat.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catRepository: CatRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDTO) {
    const { email, password } = data;

    const cat = await this.catRepository.findByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('Check your entered email and password');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Check your entered email and password');
    }

    const payload = { email: email, sub: cat.id };

    return { token: this.jwtService.sign(payload) };
  }
}
