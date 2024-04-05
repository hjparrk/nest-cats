import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from '../service/cats.service';
import { SucessInterceptor } from 'src/common/interceptors/sucess/sucess.interceptor';
import { CatDTO } from '../../common/dto/cats/cat.dto';
import { CatRequestDTO } from '../../common/dto/cats/cat.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDTO } from 'src/common/dto/auth/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { Cat } from 'src/common/schemas/cat.schema';

@Controller('cats')
@UseInterceptors(SucessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Get current cat' })
  @UseGuards(JwtAuthGuard)
  @Get()
  get(@CurrentUser() cat) {
    return cat.readonlyData;
  }

  @ApiOperation({ summary: 'Get all cats' })
  @Get('all')
  getAll() {
    return this.catsService.getAll();
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
  login(@Body() data: LoginRequestDTO) {
    return this.authService.jwtLogin(data);
  }

  @ApiOperation({ summary: 'upload cat image' })
  @UseInterceptors(FilesInterceptor('image', 1, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    return this.catsService.uploadImg(cat, images);
  }
}
