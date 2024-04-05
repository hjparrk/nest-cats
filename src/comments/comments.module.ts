import { Module } from '@nestjs/common';
import { CommentsService } from './service/comments.service';
import { CommentsController } from './controller/comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/common/schemas/comments.schema';
import { CommentRepository } from 'src/common/repositories/comment.repository';
import { CatRepository } from 'src/common/repositories/cat.repository';
import { Cat, CatSchema } from 'src/common/schemas/cat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Cat.name, schema: CatSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository, CatRepository],
})
export class CommentsModule {}
