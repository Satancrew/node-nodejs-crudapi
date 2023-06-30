import { ServerResponse } from 'http';
import { User } from '../helpers/types';
import { v4 as uuidv4 } from 'uuid';

export class DB {
  users: User[] = [
    {
      id: '12345',
      username: 'Vladimir',
      age: 31,
      hobbies: ['node', 'ts', 'stradanie'],
    },
  ];

  async getUsers() {
    return this.users;
  }

  async addUser(user: User) {
    const newUser = { id: uuidv4(), ...user };
    this.users.push(newUser);
    return newUser;
  }
}
