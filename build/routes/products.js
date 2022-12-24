"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAuthToken_1 = __importDefault(require("../utilities/verifyAuthToken"));
const productsRouter = express_1.default.Router();
//controller
const products_1 = __importDefault(require("../controllers/products"));
//top 5 most popular products http://localhost:3000/products/top
productsRouter.route("/top").get(products_1.default.listTopProducts);
//product by category http://localhost:3000/products/category/1
productsRouter.route("/category/:id").get(products_1.default.listProductsByCategory);
//list all product categories  http://localhost:3000/products/categories
productsRouter.route("/categories").get(products_1.default.listCategories);
// / route list all products http://localhost:3000/products
productsRouter.route("/").get(products_1.default.list);
//specific product /1 list a specific product by id http://localhost:3000/products/1
productsRouter.route("/:id").get(products_1.default.showProduct);
//create a new product POST http://localhost:3000/products { "name":"Cheese Lovers Pizza","price":70,"category":"1"}
//requires authorizatin header Authorization: Bearer jwtToken
productsRouter.route("/").post(verifyAuthToken_1.default, products_1.default.createProduct);
//update a product PUT http://localhost:3000/products/1 { "name":"Four Cheese Pizza","price":90,"category":"1"}
productsRouter.route("/:id").put(verifyAuthToken_1.default, products_1.default.updateProduct);
//DELETE a product DELETE http://localhost:3000/products/1
productsRouter.route("/:id").delete(verifyAuthToken_1.default, products_1.default.deleteProduct);
exports.default = productsRouter;
