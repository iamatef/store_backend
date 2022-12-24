# Store backend project Udacity
This project is a store backend using NodeJS,TypeScript and PostgreSQL with support of JWT

## Install
here are steps to install DB and project

### Database and user creation
- Create two databases named "cart_dev" and "cart_test" 
on terminal psql postgres
create database cart_dev;
create database cart_test;

- Createa a user named "full_stack_user" with password "password123"
on terminal psql postgres
create user full_stack_user with password 'password123';
grant all privileges on database cart_dev to full_stack_user;
grant all privileges on database cart_test to full_stack_user;

### Project installation
- Clone/download the current repo 
- to install dependencies on terminal npm install 
- to install database tables, on terminal  db-migrate up;
- to jasmine test the porject npm run test
- to start the porject npm run start
- despite .env file should be added to .gitignore, we left it to be uploaded just as an exception and due to not being a critical project [for easy delivery]
- Project has been pretified using prettier, linted using ESlint and all jasmine tests passed 
- Endpoints are updated on the REQUIREMENTS.md file
- Project has been prettified using prettier 

![Prettier](https://i.imgur.com/L7dO6qy.png)

- Project was linted using ESLint 

![Prettier](https://i.imgur.com/eaJmnsv.png)

- Jasmine tests passed

![Prettier](https://i.imgur.com/VSFs7iZ.png)
