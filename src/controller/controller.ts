import { ServerResponse } from "http";
import { headers } from "../helpers/consts";
import { DB } from "../database/db";

const data = new DB();

export class Controller {

  getAll = (response: ServerResponse) => {
    try {
      const users = data.getUsers();
      response.writeHead(200, headers);
      response.end(JSON.stringify(users));
    } catch (err) {
      response.writeHead(500, headers);
      console.log(err.message);
      response.end();
    }
  }
}