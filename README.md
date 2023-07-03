# node-nodejs-crudapi

# Install

1. git clone [https://github.com/Satancrew/node-nodejs-crudapi.git]
2. npm install

# Running

1. npm run start:dev - **Run development mode**
2. npm run start:prod - **Run production mode**
2. npm run test - **Run tests**

# Using app

1. Add endpoint **api/users**

2. Use **GET** api/users to get all Users

3. Use **POST** to create new user and store him in databse.
User has the following properties:
- **id** - identifier created by uuid (string)
- **username** - user name (string);
- **age** - user age (number);
- **hobbies** - user hobbies (string[] (or emprty));

All properties are **required**. Id is created independently on the server side.

4. Use **GET** with specific userID for to get user information
- GET api/users/${userID}

5. Use **PUT** with specific userID for update user
- PUT api/users/${userID}

6. Use **DELETE** with specific userID for delete user
- DELETE api/users/${userID}
  

Example of User for using with POST method: 
```
{
  "username": "RandomUserName,
  "age": 34,
  "hobbies": ["typescript", "nodejs"]
}
```