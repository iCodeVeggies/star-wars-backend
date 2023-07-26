export const UNIT_TEST_MOCKED_CHARACTERS = {
  CREATE: {
    name: 'New Character',
    episodes: ['NEWHOPE'],
    planet: 'New Planet',
  },
  DELETE: {
    name: 'Deleted Character',
    episodes: ['JEDI', 'EMPIRE'],
    planet: 'Tatooine',
  },
  FIND: [
    {
      name: 'Jyn Erso',
      episodes: ['ROGUE'],
      planet: 'Vallt',
    },
    {
      name: 'R2-D2',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
      planet: 'Naboo',
    },
  ],
  FIND_BY_ID: {
    name: 'Luke Skywalker',
    episodes: ['NEWHOPE', 'EMPIRE'],
    planet: 'Tatooine',
  },
  UPDATE: {
    name: 'Updated Character',
    episodes: ['NEWHOPE', 'EMPIRE'],
    planet: 'Tatooine',
  },
};
export const E2E_TEST_MOCKED_CHARACTERS = {
  CREATE: {
    name: 'New Character',
    episodes: ['NEWHOPE'],
    planet: 'New Planet',
  },
  UPDATE: {
    name: 'Updated Character',
    episodes: ['NEWHOPE', 'EMPIRE'],
    planet: 'Tatooine',
  },
};
