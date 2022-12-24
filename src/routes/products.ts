import express from "express";
import verifyAuthToken from "../utilities/verifyAuthToken";

const productsRouter = express.Router();

//controller
import products from "../controllers/products";

//top 5 most popular products http://localhost:3000/products/top
productsRouter.route("/top").get(products.listTopProducts);

//product by category http://localhost:3000/products/category/1
productsRouter.route("/category/:id").get(products.listProductsByCategory);

//list all product categories  http://localhost:3000/products/categories
productsRouter.route("/categories").get(products.listCategories);

// / route list all products http://localhost:3000/products
productsRouter.route("/").get(products.list);

//specific product /1 list a specific product by id http://localhost:3000/products/1
productsRouter.route("/:id").get(products.showProduct);

//create a new product POST http://localhost:3000/products { "name":"Cheese Lovers Pizza","price":70,"category":"1"}
//requires authorizatin header Authorization: Bearer jwtToken
productsRouter.route("/").post(verifyAuthToken, products.createProduct);

//update a product PUT http://localhost:3000/products/1 { "name":"Four Cheese Pizza","price":90,"category":"1"}
productsRouter.route("/:id").put(verifyAuthToken, products.updateProduct);

//DELETE a product DELETE http://localhost:3000/products/1
productsRouter.route("/:id").delete(verifyAuthToken, products.deleteProduct);

export default productsRouter;
