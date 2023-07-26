import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Character } from './schemas/character.schema';
import { CreateCharacterDto, UpdateCharacterDto } from './dto';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of characters',
    type: Character,
    isArray: true,
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Character[]> {
    return await this.charactersService.findAll(page, limit);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Character found', type: Character })
  @ApiNotFoundResponse({ description: 'Character not found' })
  async findById(@Param('id') id: string): Promise<Character> {
    return await this.charactersService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Character created',
    type: Character,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() character: CreateCharacterDto): Promise<Character> {
    return await this.charactersService.create(character);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Character updated',
    type: Character,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Character not found' })
  async update(
    @Param('id') id: string,
    @Body() character: UpdateCharacterDto,
  ): Promise<UpdateCharacterDto> {
    return await this.charactersService.update(id, character);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Character deleted' })
  @ApiNotFoundResponse({ description: 'Character not found' })
  async delete(@Param('id') id: string): Promise<Character> {
    return await this.charactersService.delete(id);
  }
}
