import { server } from '../index';
import request from 'supertest';
import { User, UserWithoutId } from '../helpers/types';
import { validate, v4 as uuidv4 } from 'uuid';

describe('Get all users', () => {
  it('should return empty array', async () => {
    const response = await request(server).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe('Create new user with POST', () => {
  const testUser: UserWithoutId = {
    username: 'Vladimir',
    age: 25,
    hobbies: ['node', 'typescript', 'stradanie'],
  };

  let newUser;

  it('create new user and testing gis data', async () => {
    const response = await request(server).post('/api/users').send(testUser);
    expect(response.statusCode).toBe(201);
    expect(validate(response.body.id)).toBe(true);
    expect(response.body.age).toBe(testUser.age);
    expect(response.body.username).toBe(testUser.username);
    expect(response.body.hobbies).toEqual(testUser.hobbies);
    expect(Object.keys(response.body).length).toBe(4);

    newUser = response.body;
  });
});

afterAll(async () => {
  server.close();
});
