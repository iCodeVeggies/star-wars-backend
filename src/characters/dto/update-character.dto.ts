import { ApiProperty } from '@nestjs/swagger';
import { CreateCharacterDto } from './create-character.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
  @ApiProperty({
    description: 'The name of the character',
    example: 'Luke Skywalker',
  })
  name?: string;

  @ApiProperty({
    description: 'An array of episodes the character appeared in',
    example: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  })
  episodes?: string[];

  @ApiProperty({
    description: 'The planet the character is from',
    example: 'Alderaan',
    required: false,
  })
  planet?: string;
}
