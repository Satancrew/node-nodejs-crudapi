import { IncomingMessage, ServerResponse } from 'http';
import { Controller } from '../controller/controller';
import { headers } from '../helpers/consts';
import { error } from 'console';

const newController = new Controller();

export const router = (request: IncomingMessage, response: ServerResponse) => {
  try {
    if (
      request.method === 'GET' &&
      (request.url === '/api/users' || request.url === '/api/users/')
    ) {
      return newController.getAll(response);
    }

    if (
      request.method === 'POST' &&
      (request.url === '/api/users' || request.url === '/api/users/')
    ) {
      return newController.createUser(request, response);
    }

    if (
      request.method === 'GET' &&
      request.url.split('/').length === 4 &&
      request.url.startsWith('/api/users/')
    ) {
      const userArray = request.url.split('/');
      const userId = userArray[3];
      return newController.findUser(userId, response);
    }

    if (
      request.method === 'DELETE' &&
      request.url.split('/').length === 4 &&
      request.url.startsWith('/api/users/')
    ) {
      const userArray = request.url.split('/');
      const userId = userArray[3];
      return newController.removeUser(userId, response);
    }

    if (
      request.method === 'PUT' &&
      request.url.split('/').length === 4 &&
      request.url.startsWith('/api/users/')
    ) {
      const userArray = request.url.split('/');
      const userId = userArray[3];
      return newController.changeUser(userId, response, request);
    }
    response.writeHead(404, headers);
    return response.end(JSON.stringify({ message: 'Path not found' }));
  } catch (err) {
    console.log(err.message)
  }
};
