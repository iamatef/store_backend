"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const usersC = new users_1.default();
//index all users
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //grab all users
    try {
        const users = yield usersC.index();
        res.json(users);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
//indexByID
const indexByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //grab all users
    try {
        const { id } = req.params;
        const users = yield usersC.show(parseInt(id));
        res.json(users);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
//createUser
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //create
    try {
        const { firstname, lastname, password, username } = req.body;
        const users = yield usersC.create({
            firstName: firstname,
            lastName: lastname,
            password: password,
            username: username
        });
        res.json(users);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
//deleteUser
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //create
    try {
        const { id } = req.params;
        const users = yield usersC.delete(id);
        res.json(users);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
//updateUser
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //create
    try {
        const { id } = req.params;
        const { username, password } = req.body;
        const users = yield usersC.update(id, username, password);
        res.json(users);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //create
    try {
        const { username, password } = req.body;
        const users = yield usersC.authenticate(username, password);
        res.json(users);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
exports.default = {
    index,
    indexByID,
    createUser,
    authenticateUser,
    deleteUser,
    updateUser
};
