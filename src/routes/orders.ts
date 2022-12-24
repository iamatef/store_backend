import express from "express";
import verifyAuthToken from "../utilities/verifyAuthToken";

const ordersRouter = express.Router();

//controller
import orders from "../controllers/orders";

//create an order POST http://localhost:3000/orders { "user_id": "1"  }
ordersRouter.route("/").post(verifyAuthToken, orders.createNewOrder);

//add products to the order POST http://localhost:3000/orders/1 {"product_id" : "1" , "quantity": 5}
ordersRouter.route("/:id").post(verifyAuthToken, orders.addProductToOrder);

//disaply a specific order products GET http://localhost:3000/orders/1
ordersRouter.route("/:id").get(verifyAuthToken, orders.showProductsOFANOrder);

//complete the order change the status from active to complete POST http://localhost:3000/orders/1/close
ordersRouter.route("/:id/close").post(verifyAuthToken, orders.CompleteAnOrder);

//completed orders by user ID http://localhost:3000/orders/user/1/complete
ordersRouter
  .route("/user/:id/complete")
  .get(verifyAuthToken, orders.listUserOrdersByUserIDComplete);

//orders by user ID http://localhost:3000/orders/user/1
ordersRouter
  .route("/user/:id")
  .get(verifyAuthToken, orders.listUserOrdersByUserID);

export default ordersRouter;
