import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';
import { CreateCharacterDto, UpdateCharacterDto } from './dto';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Character[]> {
    const skip = (page - 1) * limit;
    return await this.characterModel.find().skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<Character> {
    const character = await this.characterModel.findById(id).exec();
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return character;
  }

  async create(character: CreateCharacterDto): Promise<Character> {
    if (!character.name || !character.episodes) {
      throw new BadRequestException(
        'Name and episodes are required to create a character',
      );
    }
    return await this.characterModel.create(character);
  }

  async update(id: string, character: UpdateCharacterDto): Promise<Character> {
    const updatedCharacter = await this.characterModel.findByIdAndUpdate(
      id,
      character,
      { new: true },
    );
    if (!updatedCharacter) {
      throw new NotFoundException('Character not found');
    }
    return updatedCharacter;
  }

  async delete(id: string): Promise<Character> {
    const deletedCharacter = await this.characterModel.findByIdAndDelete(id);
    if (!deletedCharacter) {
      throw new NotFoundException('Character not found');
    }
    return deletedCharacter;
  }
}
