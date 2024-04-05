import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { SucessInterceptor } from 'src/common/interceptors/sucess/sucess.interceptor';

@Controller('cats')
@UseInterceptors(SucessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAll() {
    // throw new HttpException('Get All Cats API Broken', 401);
    return { cats: 'Get All Cats' };
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe, PositiveIntPipe) id: number) {
    console.log(`id: ${id}`);

    return 'One Cat';
  }

  @Post()
  create() {
    return 'New Cat';
  }

  @Put(':id')
  update() {
    return 'Update Cat';
  }

  @Patch(':id')
  updatePartial() {
    return 'Update Part of Cat';
  }

  @Delete(':id')
  destroy() {
    return 'delete cat';
  }
}
