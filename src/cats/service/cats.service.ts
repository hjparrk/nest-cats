import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDTO } from '../../common/dto/cats/cat.request.dto';

import * as bcrypt from 'bcrypt';
import { CatRepository } from 'src/common/repositories/cat.repository';
import { Cat } from 'src/common/schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(private readonly catRepository: CatRepository) {}

  async getAll() {
    const cats = await this.catRepository.findAll();
    const readonlyCats = cats.map((cat) => cat.readonlyData);

    return readonlyCats;
  }

  async signup(body: CatRequestDTO) {
    const { email, password, name, imgUrl } = body;
    const isExist = await this.catRepository.existsByEmail(email);

    if (isExist) {
      throw new UnauthorizedException('Cat already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catRepository.create({
      email,
      password: hashedPassword,
      name,
      imgUrl,
    });

    return cat.readonlyData;
  }

  async uploadImg(cat: Cat, images: Express.Multer.File[]) {
    const filename = `cats/${images[0].filename}`;
    const updatedCat = await this.catRepository.findByIdAndUpdateImg(
      cat.id,
      filename,
    );
    return updatedCat;
  }
}
