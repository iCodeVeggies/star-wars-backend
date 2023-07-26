import { IsNotEmpty, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCharacterDto {
  @ApiProperty({
    description: 'The name of the character',
    example: 'Luke Skywalker',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'An array of episodes the character appeared in',
    example: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  })
  @ArrayNotEmpty()
  episodes: string[];

  @ApiProperty({
    description: 'The planet the character is from',
    example: 'Alderaan',
    required: false,
  })
  planet?: string;
}
