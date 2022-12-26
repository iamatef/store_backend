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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const users_1 = __importDefault(require("../../models/users")); //users model
const request = supertest_1.default;
const token = process.env.TEST_JWT; //test JWT for endpoints that requires authentication
describe("Supertest Endpoints /users", function () {
    //GET http://localhost:3000/users
    it("GET /users index all users without a jwt token to return 401 unauthorized", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default).get("/users");
        expect(response.status).toBe(401);
    }));
    //POST http://localhost:3000/users  { "firstname":"Aya","lastname":"Atef","password":"AtefPass","username":"aya"}
    it("POST /users //create a new user", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default)
            .post("/users")
            .send({
            firstname: "Aya",
            lastname: "Atef",
            password: "AtefPass",
            username: "aya2"
        })
            .set("Accept", "application/json");
        const json = JSON.parse(response.text);
        expect(json.id).toEqual(jasmine.any(Number));
        expect(json.username).toEqual("aya2");
    }));
    //POST http://localhost:3000/users/authenticate { "password":"AtefPass","username":"aya"}
    it("POST /users/authenticate //login with username and password and get a JWT", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default)
            .post("/users/authenticate")
            .send({ password: "AtefPass", username: "aya2" })
            .set("Accept", "application/json");
        const json = JSON.parse(response.text);
        expect(json.status).toEqual("success");
    }));
    //GET http://localhost:3000/users
    it("GET /users index all users", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default)
            .get("/users")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        const json = JSON.parse(response.text);
        expect(json[0].id).toEqual(jasmine.any(Number));
    }));
    //GET http://localhost:3000/users/1
    it("GET /users/1 index a specific user", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default)
            .get("/users/1")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        const json = JSON.parse(response.text);
        expect(json.id).toEqual(jasmine.any(Number));
    }));
    //PUT http://localhost:3000/users/1 { "username":"Polly","password":"secretsaresecrets" }
    it("PUT /users //update username and password for user by id", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default)
            .put("/users/1")
            .send({
            password: "no",
            username: "hell"
        })
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`);
        const json = JSON.parse(response.text);
        expect(json.id).toEqual(1);
        expect(json.username).toEqual("hell");
    }));
    //DELETE
    it("DELETE /users/id Delete a specific user", () => __awaiter(this, void 0, void 0, function* () {
        try {
            const usersC = new users_1.default();
            const createdU = yield usersC.create({
                firstName: "John",
                lastName: "Due",
                password: "P@ssw0rd",
                username: "johndue4"
            });
            createdU.id;
            //deleting....
            const response = yield request(index_1.default)
                .delete("/users/" + createdU.id)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            const json = JSON.parse(response.text);
            expect(json.id).toEqual(createdU.id);
        }
        catch (error) {
            //do nothing
        }
    }));
});
