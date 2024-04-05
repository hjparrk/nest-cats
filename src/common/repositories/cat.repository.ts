import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../schemas/cat.schema';
import { Model } from 'mongoose';
import { CatRequestDTO } from '../dto/cats/cat.request.dto';
import { Comment } from '../schemas/comments.schema';

@Injectable()
export class CatRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async create(cat: CatRequestDTO): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });
      if (result) return true;
      else return false;
    } catch (error) {
      throw new HttpException('DB Error', 400);
    }
  }

  async findByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async findById(id: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(id).select('-password');
    return cat;
  }

  async findByIdAndUpdateImg(id: string, filename: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${filename}`;
    const updatedCat = await cat.save();
    return updatedCat.readonlyData;
  }

  async findAll(): Promise<Cat[] | null> {
    const cats = await this.catModel
      .find()
      .select('-password')
      .populate({ path: 'comments', model: this.commentModel });
    return cats;
  }
}
