import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentRequestDTO } from 'src/common/dto/comments/comment.request.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'get all comments on the current cat' })
  @Get()
  async getAll() {
    return await this.commentsService.getAll();
  }

  @ApiOperation({ summary: 'create a comment on a cat' })
  @Post(':id')
  async create(@Param('id') id: string, @Body() body: CommentRequestDTO) {
    return await this.commentsService.create(id, body);
  }

  @ApiOperation({ summary: 'increase likes by 1' })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    return await this.commentsService.plusLike(id);
  }
}
