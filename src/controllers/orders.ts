import express from "express";
import Orders from "../models/orders";
const ordersC = new Orders();

const listUserOrdersByUserID = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //grab user ID
  const { id } = req.params;

  //grab all orders for current user id
  try {
    const products = await ordersC.indexByUser(parseInt(id));
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const listUserOrdersByUserIDComplete = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //grab user ID
  const { id } = req.params;

  //grab all orders for current user id
  try {
    const products = await ordersC.indexCompletedByUser(parseInt(id));
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const createNewOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { user_id } = req.body;

  try {
    const products = await ordersC.create(parseInt(user_id));
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const addProductToOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { id } = req.params;
  const { product_id, quantity } = req.body;

  try {
    const products = await ordersC.addProduct(
      parseInt(id),
      parseInt(product_id),
      parseInt(quantity)
    );
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const CompleteAnOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const products = await ordersC.completeOrder(parseInt(id));
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

//showProductsOFANOrder
const showProductsOFANOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const products = await ordersC.indexProductsForOrder(parseInt(id));
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
export default {
  listUserOrdersByUserID,
  listUserOrdersByUserIDComplete,
  createNewOrder,
  addProductToOrder,
  CompleteAnOrder,
  showProductsOFANOrder
};
