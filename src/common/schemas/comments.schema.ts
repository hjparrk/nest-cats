import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comment extends Document {
  @ApiProperty({
    description: 'author cat id',
    required: true,
  })
  @Prop({
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'content',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: '# likes',
  })
  @Prop({
    default: 0,
  })
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    description: 'info of the post that comment is on',
    required: true,
  })
  @Prop({
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
