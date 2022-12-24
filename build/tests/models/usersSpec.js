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
const users_1 = __importDefault(require("../../models/users")); //users model
describe("Testing users model", function () {
    return __awaiter(this, void 0, void 0, function* () {
        //Instanticate users class
        const usersC = new users_1.default();
        it("Check if index method on users class exists and is defined", () => __awaiter(this, void 0, void 0, function* () {
            expect(usersC.index).toBeDefined;
        }));
        it("Add a new user and Check if returned ID is a numeric value", () => __awaiter(this, void 0, void 0, function* () {
            //create our first user
            const createdUser = yield usersC.create({
                firstName: "Ahmed",
                lastName: "Rajeb",
                password: "Hamoksha",
                username: "ahmedrajeb2"
            });
            expect(createdUser.id).toEqual(jasmine.any(Number));
            //create second user to be deleted
            yield usersC.create({
                firstName: "Ahmed",
                lastName: "Rajeb",
                password: "Hamoksha",
                username: "ahmedrajeb3"
            });
            expect(createdUser.id).toEqual(jasmine.any(Number));
        }));
        it("index users method to return an array of users and first user ID is numeric", () => __awaiter(this, void 0, void 0, function* () {
            const userList = yield usersC.index();
            expect(userList[0].id).toEqual(jasmine.any(Number));
        }));
        it("show user method to return a user and user ID is numeric", () => __awaiter(this, void 0, void 0, function* () {
            const userRet = yield usersC.show(1);
            expect(userRet.id).toEqual(jasmine.any(Number));
        }));
        it("authenticate user method with correct credentials to return a status success and a JWT", () => __awaiter(this, void 0, void 0, function* () {
            const userRet = yield usersC.authenticate("ahmedrajeb2", "Hamoksha");
            expect(userRet.status).toEqual("success");
        }));
        //update username and password
        it("update user method to update username and password the user by id", () => __awaiter(this, void 0, void 0, function* () {
            const userRet = yield usersC.update("2", "Johnny", "Manga");
            expect(userRet.username).toEqual("Johnny");
        }));
        //delete
        it("delete user method to delete the user by id", () => __awaiter(this, void 0, void 0, function* () {
            const userRet = yield usersC.delete("2");
            expect(userRet.id).toEqual(2);
        }));
    });
});
