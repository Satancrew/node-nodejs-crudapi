import { IncomingMessage, ServerResponse } from 'http';
import { Controller } from '../controller/controller';

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
  } catch (error) {}
  return response.end(JSON.stringify({ message: 'Path not found' }));
};
