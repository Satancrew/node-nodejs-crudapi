import { IncomingMessage } from 'http';
import { UserWithoutId } from './types';

export const getBodyRequest = async (request: IncomingMessage) => {
  let body = '';

  try {
    for await (const chunk of request) {
      body += chunk;
    }
    return body;
  } catch (err) {
    console.log(err.message);
  }
};

export const validateUser = (object: UserWithoutId): boolean => {
  const { username, age, hobbies } = object;

  if (
    typeof username === "string" &&
    typeof age === "number" &&
    Array.isArray(hobbies) && 
    hobbies.every(item => typeof item === "string")
  ) {
    return true;
  }

  return false;
};