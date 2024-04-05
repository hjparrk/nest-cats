import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/common/schemas/cat.schema';

export class CatRequestDTO extends PickType(Cat, [
  'email',
  'password',
  'name',
  'imgUrl',
] as const) {}
