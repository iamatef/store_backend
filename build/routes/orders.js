"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAuthToken_1 = __importDefault(require("../utilities/verifyAuthToken"));
const ordersRouter = express_1.default.Router();
//controller
const orders_1 = __importDefault(require("../controllers/orders"));
//create an order POST http://localhost:3000/orders { "user_id": "1"  }
ordersRouter.route("/").post(verifyAuthToken_1.default, orders_1.default.createNewOrder);
//add products to the order POST http://localhost:3000/orders/1 {"product_id" : "1" , "quantity": 5}
ordersRouter.route("/:id").post(verifyAuthToken_1.default, orders_1.default.addProductToOrder);
//disaply a specific order products GET http://localhost:3000/orders/1
ordersRouter.route("/:id").get(verifyAuthToken_1.default, orders_1.default.showProductsOFANOrder);
//complete the order change the status from active to complete POST http://localhost:3000/orders/1/close
ordersRouter.route("/:id/close").post(verifyAuthToken_1.default, orders_1.default.CompleteAnOrder);
//completed orders by user ID http://localhost:3000/orders/user/1/complete
ordersRouter
    .route("/user/:id/complete")
    .get(verifyAuthToken_1.default, orders_1.default.listUserOrdersByUserIDComplete);
//orders by user ID http://localhost:3000/orders/user/1
ordersRouter
    .route("/user/:id")
    .get(verifyAuthToken_1.default, orders_1.default.listUserOrdersByUserID);
exports.default = ordersRouter;
