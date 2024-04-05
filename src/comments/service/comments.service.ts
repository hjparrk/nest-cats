import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentRequestDTO } from 'src/common/dto/comments/comment.request.dto';
import { CatRepository } from 'src/common/repositories/cat.repository';
import { CommentRepository } from 'src/common/repositories/comment.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly catRepository: CatRepository,
  ) {}
  async getAll() {
    return await this.commentRepository.findAll();
  }

  async create(catId: string, comment: CommentRequestDTO) {
    try {
      const { author, content } = comment;

      const targetCat = await this.catRepository.findById(catId);
      const authorCat = await this.catRepository.findById(author);
      const newComment = await this.commentRepository.create(
        authorCat.id,
        content,
        targetCat.id,
      );
      return newComment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(commentId: string) {
    try {
      const comment = await this.commentRepository.findById(commentId);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {}
  }
}
