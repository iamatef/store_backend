# Store backend project Udacity
This project is a store backend using NodeJS,TypeScript and PostgreSQL with support of JWT

## Install
here are steps to install DB and project

### Database and user creation
- Create two databases named "cart_dev" and "cart_test"  
```  
psql postgres  
create database cart_dev;  
create database cart_test;  
```

- Createa a user named "full_stack_user" with password "password123" 
```
psql postgres  
create user full_stack_user with password 'password123';  
grant all privileges on database cart_dev to full_stack_user;  
grant all privileges on database cart_test to full_stack_user; 
```

### Project installation
- Clone/download the current repo 
- Create .env file with these info:-
```
PORT=3000
DATABASE_NAME=cart_dev
DATABASE_NAME_TEST=cart_test
DATABASE_USER=full_stack_user
DATABASE_PASSWORD=password123
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
SALT_ROUNDS=10
PEPPER=LIFEISLIFE
BCRYPT_PASS=LIFEISNOTEASY
TOKEN_SECRET=LOVEPIZZA
ENV=DEV
TEST_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImF5YSIsImZpcnN0bmFtZSI6IkF5YSIsImxhc3RuYW1lIjoiQXRlZiJ9LCJpYXQiOjE2NzE2NTc3MDJ9.0BoqQEmRsMymWs5VFe9dpRxh9DAWKezXYdwG1LfYZFM
```

- to install dependencies on terminal 
```
npm install
```
- to install database tables, on terminal  
```
db-migrate up;
```
- to jasmine test the porject 
```
npm run test
```
- to start the porject
```
npm run start
```
- Project has been pretified using prettier, linted using ESlint and all jasmine tests passed 
- Endpoints are updated on the REQUIREMENTS.md file
- Project has been prettified using prettier 

![Prettier](https://i.imgur.com/L7dO6qy.png)

- Project was linted using ESLint 

![Prettier](https://i.imgur.com/eaJmnsv.png)

- Jasmine tests passed

![Prettier](https://i.imgur.com/VSFs7iZ.png)
