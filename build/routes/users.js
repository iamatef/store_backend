"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAuthToken_1 = __importDefault(require("../utilities/verifyAuthToken"));
const usersRouter = express_1.default.Router();
//controller
const users_1 = __importDefault(require("../controllers/users"));
// / index all users http://localhost:3000/users/
usersRouter.route("/").get(verifyAuthToken_1.default, users_1.default.index);
// /id user by id http://localhost:3000/users/1
usersRouter.route("/:id").get(verifyAuthToken_1.default, users_1.default.indexByID);
// authenticate user by username and password and get a jwt if correct login http://localhost:3000/users/authenticate
usersRouter.route("/authenticate").post(users_1.default.authenticateUser);
// create new user POST http://localhost:3000/users
usersRouter.route("/").post(users_1.default.createUser);
// delete a new user
usersRouter.route("/:id").delete(verifyAuthToken_1.default, users_1.default.deleteUser);
// update username and password for a specific user by id
usersRouter.route("/:id").put(verifyAuthToken_1.default, users_1.default.updateUser);
exports.default = usersRouter;
