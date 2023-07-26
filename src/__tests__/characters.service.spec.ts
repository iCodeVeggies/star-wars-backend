import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from '../characters/characters.service';
import { getModelToken } from '@nestjs/mongoose';
import {
  Character,
  CharacterDocument,
} from '../characters/schemas/character.schema';
import { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto, UpdateCharacterDto } from '../characters/dto';
import { UNIT_TEST_MOCKED_CHARACTERS } from './constants';

describe('CharactersService', () => {
  let charactersService: CharactersService;
  let characterModel: Model<CharacterDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: getModelToken(Character.name),
          useFactory: () => ({
            find: jest.fn().mockReturnValue({
              skip: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              exec: jest
                .fn()
                .mockResolvedValue(UNIT_TEST_MOCKED_CHARACTERS.FIND),
            }),
            findById: jest.fn().mockReturnValue({
              exec: jest
                .fn()
                .mockResolvedValue(UNIT_TEST_MOCKED_CHARACTERS.FIND_BY_ID),
            }),
            create: jest
              .fn()
              .mockResolvedValue(UNIT_TEST_MOCKED_CHARACTERS.CREATE),
            findByIdAndUpdate: jest
              .fn()
              .mockResolvedValue(UNIT_TEST_MOCKED_CHARACTERS.UPDATE),
            findByIdAndDelete: jest
              .fn()
              .mockResolvedValue(UNIT_TEST_MOCKED_CHARACTERS.DELETE),
          }),
        },
      ],
    }).compile();

    charactersService = module.get<CharactersService>(CharactersService);
    characterModel = module.get<Model<CharacterDocument>>(
      getModelToken(Character.name),
    );
  });

  describe('findAll', () => {
    it('should return mocked characters', async () => {
      const page = 1;
      const limit = 10;

      expect(await charactersService.findAll(page, limit)).toEqual(
        UNIT_TEST_MOCKED_CHARACTERS.FIND,
      );
      expect(characterModel.find).toHaveBeenCalledTimes(1);
      expect(characterModel.find).toHaveBeenCalledWith();
      expect(characterModel.find().skip).toHaveBeenCalledTimes(1);
      expect(characterModel.find().skip).toHaveBeenCalledWith(0);
      expect(characterModel.find().limit).toHaveBeenCalledTimes(1);
      expect(characterModel.find().limit).toHaveBeenCalledWith(limit);
      expect(characterModel.find().exec).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return the character when found', async () => {
      const id = 'some-character-id';

      expect(await charactersService.findById(id)).toEqual(
        UNIT_TEST_MOCKED_CHARACTERS.FIND_BY_ID,
      );
      expect(characterModel.findById).toHaveBeenCalledTimes(1);
      expect(characterModel.findById).toHaveBeenCalledWith(id);
      expect(characterModel.findById(id).exec).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when character is not found', async () => {
      const id = 'non_existent_id';
      const mockFindById = jest.fn().mockReturnValue(null);
      characterModel.findById = jest.fn().mockReturnValue({
        exec: mockFindById,
      });

      await expect(charactersService.findById(id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(characterModel.findById).toHaveBeenCalledTimes(1);
      expect(characterModel.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should create a character', async () => {
      const createCharacterDto: CreateCharacterDto =
        UNIT_TEST_MOCKED_CHARACTERS.CREATE;

      expect(await charactersService.create(createCharacterDto)).toEqual(
        UNIT_TEST_MOCKED_CHARACTERS.CREATE,
      );
      expect(characterModel.create).toHaveBeenCalledTimes(1);
      expect(characterModel.create).toHaveBeenCalledWith(createCharacterDto);
    });

    it('should throw BadRequestException when name or episodes are missing', async () => {
      const createCharacterDto: CreateCharacterDto = {
        name: '', // Missing name intentionally
        episodes: ['NEWHOPE'],
      };

      await expect(
        charactersService.create(createCharacterDto),
      ).rejects.toThrowError(BadRequestException);
      expect(characterModel.create).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update the character when found', async () => {
      const id = 'existing-character-id';
      const updateCharacterDto: UpdateCharacterDto =
        UNIT_TEST_MOCKED_CHARACTERS.UPDATE;

      expect(await charactersService.update(id, updateCharacterDto)).toEqual(
        UNIT_TEST_MOCKED_CHARACTERS.UPDATE,
      );
      expect(characterModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(characterModel.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        updateCharacterDto,
        { new: true },
      );
    });

    it('should throw NotFoundException when character is not found', async () => {
      const id = 'non_existent_id';
      const updateCharacterDto: UpdateCharacterDto =
        UNIT_TEST_MOCKED_CHARACTERS.UPDATE;

      // Mock that the findByIdAndUpdate method returns null (not found)
      characterModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await expect(
        charactersService.update(id, updateCharacterDto),
      ).rejects.toThrowError(NotFoundException);
      expect(characterModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(characterModel.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        updateCharacterDto,
        { new: true },
      );
    });
  });

  describe('delete', () => {
    it('should delete the character when found', async () => {
      const id = 'some-character-id';

      expect(await charactersService.delete(id)).toEqual(
        UNIT_TEST_MOCKED_CHARACTERS.DELETE,
      );
      expect(characterModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(characterModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException when character is not found', async () => {
      const id = 'non_existent_id';
      characterModel.findByIdAndDelete = jest.fn().mockReturnValue(null);

      await expect(charactersService.delete(id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(characterModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(characterModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
});
