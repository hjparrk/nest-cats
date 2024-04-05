import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { SucessInterceptor } from 'src/common/interceptors/sucess/sucess.interceptor';
import { CatDTO } from './dto/cat.dto';
import { CatRequestDTO } from './dto/cat.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cats')
@UseInterceptors(SucessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: 'Get a cat' })
  @Get()
  get() {
    return 'a cat';
  }

  @ApiOperation({ summary: 'signup' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CatDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error ...',
  })
  @Post()
  async signup(@Body() body: CatRequestDTO) {
    return await this.catsService.signup(body);
  }

  @ApiOperation({ summary: 'login' })
  @Post('login')
  login() {
    return 'login';
  }

  @ApiOperation({ summary: 'logout' })
  @Post('logout')
  logout() {
    return 'logout';
  }

  @ApiOperation({ summary: 'upload cat image' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploaded img';
  }
}
