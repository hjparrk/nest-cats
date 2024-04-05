import { PickType } from '@nestjs/swagger';
import { Comment } from '../../schemas/comments.schema';

export class CommentRequestDTO extends PickType(Comment, [
  'author',
  'content',
] as const) {}
