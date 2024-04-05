import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDTO } from './dto/cat.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from 'src/common/schemas/cat.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async signup(body: CatRequestDTO) {
    const { email, password, name, imgUrl } = body;
    const isExist = await this.catModel.exists({ email });

    if (isExist) {
      throw new UnauthorizedException('Cat already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      password: hashedPassword,
      name,
      imgUrl,
    });

    return cat.readonlyData;
  }
}
