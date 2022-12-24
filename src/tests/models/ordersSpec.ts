import Orders from "../../models/orders"; //orders model
import Users from "../../models/users"; //users model
import Products from "../../models/products"; //products model

describe("Testing Orders model", async function () {
  //Instanticate Orders class
  const ordersC = new Orders();

  beforeAll(async () => {
    //create a test user that is required for this test suite so we can assign an order to him

    try {
      const usersC = new Users();

      await usersC.create({
        firstName: "John",
        lastName: "Due",
        password: "P@ssw0rd",
        username: "johndue3"
      });
    } catch (error) {
      //do nothing
    }

    //create a test product so we can test adding a product to an order
    try {
      const productsC = new Products();
      //create our first product
      await productsC.create({
        name: "Sugar",
        price: 10,
        category: 1
      });
    } catch (error) {
      //do nothing
    }
  });

  it("Check if show method  exists and is defined", async () => {
    expect(ordersC.show).toBeDefined;
  });

  it("Add a new order and Check if returned ID is a numeric value", async () => {
    //create our first order
    const createdProduct = await ordersC.create(1);
    expect(createdProduct.id).toEqual(jasmine.any(Number));
  });

  //indexByUser
  it("index all orders by a specific user and Check if returned order ID is a numeric value", async () => {
    const result = await ordersC.indexByUser(1);
    expect(result[0].id).toEqual(jasmine.any(Number));
  });

  //completeOrder
  it("Complete a specific order and change its stauts to complete", async () => {
    //create our first order
    const orderComplete = await ordersC.completeOrder(1);
    expect(orderComplete.status === "complete").toBe(true);
  });

  //indexCompletedByUser
  it("index all completed orders by a specific user and Check if returned order ID is a numeric value", async () => {
    const result = await ordersC.indexCompletedByUser(1);
    expect(result[0].id).toEqual(jasmine.any(Number));
  });

  //show
  it("index an order by id and Check if returned order ID is a numeric value", async () => {
    const result = await ordersC.show(1);
    expect(result.id).toEqual(jasmine.any(Number));
  });

  //addProduct
  it("add a new product to an order and check if returned quantity is 5 as set", async () => {
    const result = await ordersC.addProduct(1, 1, 5);
    expect(result.quantity).toEqual(5);
  });

  //indexProductsForOrder
  it("index all products for a specific order", async () => {
    const result = await ordersC.indexProductsForOrder(1);
    expect(result[0].id).toEqual(jasmine.any(Number));
  });
});
