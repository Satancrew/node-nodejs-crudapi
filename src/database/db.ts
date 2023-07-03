import { User, UserWithoutId } from '../helpers/types';
import { v4 as uuidv4 } from 'uuid';

export class DB {
  users: User[] = [];

  async getUsers() {
    return this.users;
  }

  async addUser(user: User) {
    const newUser = { id: uuidv4(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  async getUserById(userID: string) {
    return this.users.find(user => user.id === userID);
  }

  async deleteUser(userID: string) {
    return (this.users = this.users.filter(user => user.id !== userID));
  }

  async updateUser(user: UserWithoutId, id: string) {
    const updatedUsers = this.users.map(el => {
      return el.id === id ? { ...el, ...user, id } : el;
    });

    this.users = updatedUsers;

    return this.getUserById(id);
  }
}
