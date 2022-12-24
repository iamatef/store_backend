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
const products_1 = __importDefault(require("../../models/products")); //products model to create a user then delete it using the supertest call
const request = supertest_1.default;
const token = process.env.TEST_JWT; //test JWT for endpoints that requires authentication
describe("Supertest Endpoints /products", function () {
    // /products is live
    it("Products Endpoint Test /products", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default).get("/products");
        expect(response.status).toBe(200);
    }));
    //POST http://localhost:3000/products //create a new product missing a JWT token
    it("POST /products //create a new product withotut a token to return unauthorized 401", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default)
            .post("/products")
            .send({ name: "Strawberry", price: 90, category: "1" })
            .set("Accept", "application/json");
        expect(response.status).toBe(401);
    }));
    //POST http://localhost:3000/products //create a new product
    it("POST /products //create a new product", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default)
            .post("/products")
            .send({ name: "Strawberry", price: 90, category: "1" })
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`);
        const json = JSON.parse(response.text);
        expect(json.price).toBe(90);
    }));
    //PUT http://localhost:3000/products/1 { "name":"Four Cheese Pizza","price":90,"category":"1"} update a product
    it("PUT /products/1 //update a product", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default)
            .put("/products/1")
            .send({ name: "Strawberry Jam", price: 99, category: "1" })
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`);
        const json = JSON.parse(response.text);
        expect(json.price).toBe(99);
    }));
    //GET http://localhost:3000/products/1 //show a specific product by id
    it("GET /products/1 //show a specific product by id", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default).get("/products/1");
        expect(response.status).toBe(200);
        const json = JSON.parse(response.text);
        expect(json.price).toEqual(jasmine.any(Number));
    }));
    //GET http://localhost:3000/products/top // top 5 selling products
    it("GET /products/top // top 5 selling products", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default).get("/products/top");
        expect(response.status).toBe(200);
    }));
    //GET http://localhost:3000/products/categories //list of all categories
    it("GET /products/categories //list of all categories", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(index_1.default).get("/products/categories");
        expect(response.status).toBe(200);
        const json = JSON.parse(response.text);
        expect(json[0].id).toEqual(jasmine.any(Number));
    }));
    //DELETE product
    it("DELETE /products/id Delete a specific product", () => __awaiter(this, void 0, void 0, function* () {
        try {
            const productsC = new products_1.default();
            const createdP = yield productsC.create({
                name: "Strawberry chocolate",
                price: 99,
                category: 1
            });
            //deleting....
            const response = yield request(index_1.default)
                .delete("/products/" + createdP.id)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            const json = JSON.parse(response.text);
            expect(json.id).toEqual(createdP.id);
        }
        catch (error) {
            //do nothing
        }
    }));
});
