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
  } catch (error) {}
  return response.end(JSON.stringify({ message: 'Path not found' }));
};
