import { server } from '../index';
import request from 'supertest';
import { User, UserWithoutId } from '../helpers/types';
import { validate, v4 as uuidv4 } from 'uuid';

let newUser;
const randomId = 'dfsdf4q33c';

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

  const wrongUser = {
    username: 52,
    age: 'eleven',
    job: false,
  };

  it('create new user and testing his data', async () => {
    const response = await request(server).post('/api/users').send(testUser);
    expect(response.statusCode).toBe(201);
    expect(validate(response.body.id)).toBe(true);
    expect(response.body.age).toBe(testUser.age);
    expect(response.body.username).toBe(testUser.username);
    expect(response.body.hobbies).toEqual(testUser.hobbies);
    newUser = response.body;
  });
  it('got error when create user with wrong type', async () => {
    const response = await request(server).post('/api/users').send(wrongUser);
    expect(response.statusCode).toBe(400);
  });
});

describe('Get created user with GET method', () => {
  it('get created user by his id', async () => {
    const testingId = newUser.id;
    const response = await request(server).get('/api/users/' + testingId);
    expect(response.statusCode).toBe(200);
    expect(response.body.age).toBe(newUser.age);
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.hobbies).toEqual(newUser.hobbies);
  });
  it('get error when we trying get user with wrong id', async () => {
    const response = await request(server).get('/api/users/' + randomId);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: `User with id ${randomId} does not exist`,
    });
  });
});

describe('Delete user with Delete method', () => {
  it('deleted user by his id', async () => {
    const testingId = newUser.id;
    const response = await request(server).delete('/api/users/' + testingId);
    expect(response.statusCode).toBe(204);
  });
  it('get error when we trying delete user with wrong id', async () => {
    const response = await request(server).get('/api/users/' + randomId);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: `User with id ${randomId} does not exist`,
    });
  });
});

afterAll(async () => {
  server.close();
});
