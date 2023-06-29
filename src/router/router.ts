import { IncomingMessage, ServerResponse } from 'http';
import { Controller } from '../controller/controller';

const newController = new Controller();

export const router = (request: IncomingMessage, response: ServerResponse) => {
  
  if (request.method === 'GET' && request.url === '/api/users')
    return newController.getAll(response);

  return response.end(JSON.stringify({ message: 'Path not found' }));
};
