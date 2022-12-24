import express from "express";
import verifyAuthToken from "../utilities/verifyAuthToken";

const usersRouter = express.Router();

//controller
import users from "../controllers/users";

// / index all users http://localhost:3000/users/
usersRouter.route("/").get(verifyAuthToken, users.index);

// /id user by id http://localhost:3000/users/1
usersRouter.route("/:id").get(verifyAuthToken, users.indexByID);

// authenticate user by username and password and get a jwt if correct login http://localhost:3000/users/authenticate
usersRouter.route("/authenticate").post(users.authenticateUser);

// create new user POST http://localhost:3000/users
usersRouter.route("/").post(users.createUser);

// delete a new user
usersRouter.route("/:id").delete(verifyAuthToken, users.deleteUser);

// update username and password for a specific user by id
usersRouter.route("/:id").put(verifyAuthToken, users.updateUser);

export default usersRouter;
