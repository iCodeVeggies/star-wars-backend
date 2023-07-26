import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { E2E_TEST_MOCKED_CHARACTERS } from './constants';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let characterId = '';

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/characters (GET) should return an array of characters', async () => {
    const response = await request(app.getHttpServer())
      .get('/characters')
      .expect(200);

    // Assign first character's ID to characterId
    if (response.body?.length) {
      characterId = response.body[0]._id;
    }

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(10);
  });

  it('/characters/:id (GET) should return a character', async () => {
    const response = await request(app.getHttpServer())
      .get(`/characters/${characterId}`)
      .expect(200);

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('episodes');
  });

  it('/characters (POST) should create a character', async () => {
    const createCharacterDto = E2E_TEST_MOCKED_CHARACTERS.CREATE;

    const response = await request(app.getHttpServer())
      .post('/characters')
      .send(createCharacterDto)
      .expect(201);

    expect(response.body).toHaveProperty('name', createCharacterDto.name);
    expect(response.body).toHaveProperty(
      'episodes',
      createCharacterDto.episodes,
    );
    expect(response.body).toHaveProperty('planet', createCharacterDto.planet);
  });

  it('/characters/:id (PUT) should update a character', async () => {
    const updateCharacterDto = E2E_TEST_MOCKED_CHARACTERS.UPDATE;

    const response = await request(app.getHttpServer())
      .put(`/characters/${characterId}`)
      .send(updateCharacterDto)
      .expect(200);

    expect(response.body).toHaveProperty('name', updateCharacterDto.name);
    expect(response.body).toHaveProperty(
      'episodes',
      updateCharacterDto.episodes,
    );
    expect(response.body).toHaveProperty('planet', updateCharacterDto.planet);
  });

  it('/characters/:id (DELETE) should delete a character', async () => {
    await request(app.getHttpServer())
      .delete(`/characters/${characterId}`)
      .expect(200);
  });
});
