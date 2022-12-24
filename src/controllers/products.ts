import express from "express";
import BackEndStoreProducts from "../models/products";
const BackEndStoreProductsC = new BackEndStoreProducts();

const list = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //grab all products for sending
  try {
    const products = await BackEndStoreProductsC.index();
    res.json(products);
  } catch (error) {
    res.status(404).send(error);
  }
};

const listTopProducts = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //grab all products for sending
  try {
    const products = await BackEndStoreProductsC.indexTop5();
    res.json(products);
  } catch (error) {
    res.status(404).send(error);
  }
};

const showProduct = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //grab product ID
  const { id } = req.params;

  //grab all products for sending
  try {
    const products = await BackEndStoreProductsC.show(parseInt(id));
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const createProduct = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { name, price, category } = req.body;
    const products = await BackEndStoreProductsC.create({
      name,
      price,
      category
    });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

//updateProduct
const updateProduct = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;
    const products = await BackEndStoreProductsC.update(id, {
      name,
      price,
      category
    });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

//deleteProduct
const deleteProduct = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const products = await BackEndStoreProductsC.delete(parseInt(id));
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const listCategories = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //grab all products for sending
  try {
    const products = await BackEndStoreProductsC.indexCategories();
    res.json(products);
  } catch (error) {
    res.status(404).send(error);
  }
};

const listProductsByCategory = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //grab all products for sending
  try {
    const { id } = req.params;

    const products = await BackEndStoreProductsC.indexByCat(parseInt(id));
    res.json(products);
  } catch (error) {
    res.status(404).send(error);
  }
};

export default {
  list,
  showProduct,
  createProduct,
  listCategories,
  listProductsByCategory,
  listTopProducts,
  updateProduct,
  deleteProduct
};
