import { IncomingMessage, ServerResponse, request } from 'http';
import { getBodyRequest, validateUser } from '../helpers/utilits';
import { headers } from '../helpers/consts';
import { DB } from '../database/db';
import { validate } from 'uuid';

const dataBase = new DB();

export class Controller {
  getAll = async (response: ServerResponse) => {
    try {
      const users = await dataBase.getUsers();
      response.writeHead(200, headers);
      response.end(JSON.stringify(users));
    } catch (err) {
      response.writeHead(500, headers);
      console.log(err.message);
      response.end(JSON.stringify({ message: `Server error` }));
    }
  };

  createUser = async (request: IncomingMessage, response: ServerResponse) => {
    try {
      const body = await getBodyRequest(request);
      const data = JSON.parse(body.toString());

      if (Object.keys(data).length === 3 && validateUser(data)) {
        const newUser = dataBase.addUser(data);
        response.writeHead(201, headers);
        return response.end(JSON.stringify(newUser));
      }

      response.writeHead(400, headers);
      return response.end(JSON.stringify({ message: 'Data is incorrect' }));
    } catch (err) {
      response.writeHead(500, headers);
      console.log(err.message);
      response.end(JSON.stringify({ message: `Server error` }));
    }
  };

  findUser = async (userId: string, response: ServerResponse) => {
    try {
      const validateId = validate(userId);

      const user = validateId ? await dataBase.getUserById(userId) : false;

      if (user) {
        response.writeHead(200, headers);
        return response.end(JSON.stringify(user));
      }

      if (!user) {
        response.writeHead(404, headers);
        return response.end(
          JSON.stringify({ message: `User with id ${userId} does not exist` }),
        );
      }

      response.writeHead(400, headers);
      return response.end(
        JSON.stringify({ message: `User with id ${userId} invalid` }),
      );

    } catch (err) {
      response.writeHead(500, headers);
      console.log(err.message);
      response.end(JSON.stringify({ message: `Server error` }));
    }
  };
}
