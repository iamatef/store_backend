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
const orders_1 = __importDefault(require("../../models/orders")); //orders model
const users_1 = __importDefault(require("../../models/users")); //users model
const products_1 = __importDefault(require("../../models/products")); //products model
describe("Testing Orders model", function () {
    return __awaiter(this, void 0, void 0, function* () {
        //Instanticate Orders class
        const ordersC = new orders_1.default();
        beforeAll(() => __awaiter(this, void 0, void 0, function* () {
            //create a test user that is required for this test suite so we can assign an order to him
            try {
                const usersC = new users_1.default();
                yield usersC.create({
                    firstName: "John",
                    lastName: "Due",
                    password: "P@ssw0rd",
                    username: "johndue3"
                });
            }
            catch (error) {
                //do nothing
            }
            //create a test product so we can test adding a product to an order
            try {
                const productsC = new products_1.default();
                //create our first product
                yield productsC.create({
                    name: "Sugar",
                    price: 10,
                    category: 1
                });
            }
            catch (error) {
                //do nothing
            }
        }));
        it("Check if show method  exists and is defined", () => __awaiter(this, void 0, void 0, function* () {
            expect(ordersC.show).toBeDefined;
        }));
        it("Add a new order and Check if returned ID is a numeric value", () => __awaiter(this, void 0, void 0, function* () {
            //create our first order
            const createdProduct = yield ordersC.create(1);
            expect(createdProduct.id).toEqual(jasmine.any(Number));
        }));
        //indexByUser
        it("index all orders by a specific user and Check if returned order ID is a numeric value", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield ordersC.indexByUser(1);
            expect(result[0].id).toEqual(jasmine.any(Number));
        }));
        //completeOrder
        it("Complete a specific order and change its stauts to complete", () => __awaiter(this, void 0, void 0, function* () {
            //create our first order
            const orderComplete = yield ordersC.completeOrder(1);
            expect(orderComplete.status === "complete").toBe(true);
        }));
        //indexCompletedByUser
        it("index all completed orders by a specific user and Check if returned order ID is a numeric value", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield ordersC.indexCompletedByUser(1);
            expect(result[0].id).toEqual(jasmine.any(Number));
        }));
        //show
        it("index an order by id and Check if returned order ID is a numeric value", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield ordersC.show(1);
            expect(result.id).toEqual(jasmine.any(Number));
        }));
        //addProduct
        it("add a new product to an order and check if returned quantity is 5 as set", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield ordersC.addProduct(1, 1, 5);
            expect(result.quantity).toEqual(5);
        }));
        //indexProductsForOrder
        it("index all products for a specific order", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield ordersC.indexProductsForOrder(1);
            expect(result[0].id).toEqual(jasmine.any(Number));
        }));
    });
});
