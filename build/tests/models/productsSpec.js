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
const products_1 = __importDefault(require("../../models/products")); //products model
describe("Testing Products model", function () {
    return __awaiter(this, void 0, void 0, function* () {
        //Instanticate Products class
        const productsC = new products_1.default();
        it("Check if index method  exists and is defined", () => __awaiter(this, void 0, void 0, function* () {
            expect(productsC.index).toBeDefined;
        }));
        it("Add a new product and Check if returned ID is a numeric value", () => __awaiter(this, void 0, void 0, function* () {
            //create our first product
            const createdProduct = yield productsC.create({
                name: "Tea",
                price: 12,
                category: 1
            });
            expect(createdProduct.id).toEqual(jasmine.any(Number));
        }));
        it("index products method to return an array of products and first product ID is numeric", () => __awaiter(this, void 0, void 0, function* () {
            const productList = yield productsC.index();
            expect(productList[0].id).toEqual(jasmine.any(Number));
        }));
        it("show product method to return a procut and product ID is numeric", () => __awaiter(this, void 0, void 0, function* () {
            const productRet = yield productsC.show(1);
            expect(productRet.id).toEqual(jasmine.any(Number));
        }));
        //update { "name":"Four Cheese Pizza","price":90,"category":"1"}
        it("Update product values by id", () => __awaiter(this, void 0, void 0, function* () {
            //create our first product
            const createdProduct = yield productsC.update("1", {
                name: "Green Tea",
                price: 19,
                category: 1
            });
            expect(createdProduct.price).toEqual(19);
        }));
        //indexTop5
        it("index top 5 products method to return an array of products", () => __awaiter(this, void 0, void 0, function* () {
            const productList = yield productsC.indexTop5();
            expect(productList).toEqual(jasmine.any(Array));
        }));
        //indexByCat
        it("index products by category method to return an array of products", () => __awaiter(this, void 0, void 0, function* () {
            const productList = yield productsC.indexByCat(1);
            expect(productList[0].id).toEqual(jasmine.any(Number));
        }));
        //indexCategories
        it("index all products categories method to return an array of categories", () => __awaiter(this, void 0, void 0, function* () {
            const catsList = yield productsC.indexCategories();
            expect(catsList[0].id).toEqual(jasmine.any(Number));
        }));
        //delete
        it("Delete product by id", () => __awaiter(this, void 0, void 0, function* () {
            //create another product to delete
            const createdProduct2 = yield productsC.create({
                name: "Tea bags",
                price: 12,
                category: 1
            });
            expect(createdProduct2.id).toEqual(jasmine.any(Number));
            //delete this created product
            const deletedProduct = yield productsC.delete(createdProduct2.id);
            expect(deletedProduct.id).toEqual(createdProduct2.id);
        }));
    });
});
