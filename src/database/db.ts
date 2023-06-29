import { ServerResponse } from 'http';
import { User } from '../helpers/types';
import { v4 as uuidv4 } from 'uuid';

export class DB {
  users: User[] = [
    {
      id: '564654656',
      username: 'Vladimir',
      age: 31,
      hobbies: ['ts', 'node', 'stradanie'],
    },
  ];

  getUsers = () => {
    return this.users;
  };

  addUser(user: User): User {
    const newUser = { ...user, id: uuidv4() };
    this.users.push(newUser);
    return newUser;
  }
}
