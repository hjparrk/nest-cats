import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './controller/cats.controller';
import { CatsService } from './service/cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from 'src/common/schemas/cat.schema';
import { CatRepository } from 'src/common/repositories/cat.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatRepository],
  exports: [CatsService, CatRepository],
})
export class CatsModule {}
