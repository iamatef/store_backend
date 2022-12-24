"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //express import for building a server
const products_1 = __importDefault(require("./routes/products")); //prodcuts route
const orders_1 = __importDefault(require("./routes/orders")); //orders route
const users_1 = __importDefault(require("./routes/users")); //users route
//ini express
const app = (0, express_1.default)();
const port = 3000;
//support parsing JSON
app.use(express_1.default.json());
// /products endpoing
app.use("/products", products_1.default);
// /orders endpoing
app.use("/orders", orders_1.default);
// /users endpoing
app.use("/users", users_1.default);
//app listining to serve traffic
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//export app for unittesting endpoint supertest
exports.default = app;
