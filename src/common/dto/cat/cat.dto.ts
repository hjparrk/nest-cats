import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Cat } from 'src/common/schemas/cat.schema';

export class CatDTO extends PickType(Cat, [
  'email',
  'name',
  'imgUrl',
] as const) {
  @ApiProperty({
    example: 'A1B2C3D4E5',
    description: 'id',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
