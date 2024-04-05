import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../schemas/comments.schema';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async findAll(): Promise<Comment[] | null> {
    return await this.commentModel.find();
  }

  async findById(id: string): Promise<Comment | null> {
    return await this.commentModel.findById(id);
  }

  async create(author: string, content: string, info: string) {
    return await this.commentModel.create({ author, content, info });
  }
}
