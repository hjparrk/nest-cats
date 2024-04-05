import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/common/schemas/cat.schema';

export class LoginRequestDTO extends PickType(Cat, [
  'email',
  'password',
] as const) {}
