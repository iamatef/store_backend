import supertest from "supertest";
import app from "../../index";
import BackEndStoreProducts from "../../models/products"; //products model to create a user then delete it using the supertest call

const request = supertest;
const token = process.env.TEST_JWT; //test JWT for endpoints that requires authentication

describe("Supertest Endpoints /products", function () {
  // /products is live
  it("Products Endpoint Test /products", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
  });

  //POST http://localhost:3000/products //create a new product missing a JWT token
  it("POST /products //create a new product withotut a token to return unauthorized 401", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "Strawberry", price: 90, category: "1" })
      .set("Accept", "application/json");

    expect(response.status).toBe(401);
  });

  //POST http://localhost:3000/products //create a new product
  it("POST /products //create a new product", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "Strawberry", price: 90, category: "1" })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const json = JSON.parse(response.text);
    expect(json.price).toBe(90);
  });

  //PUT http://localhost:3000/products/1 { "name":"Four Cheese Pizza","price":90,"category":"1"} update a product
  it("PUT /products/1 //update a product", async () => {
    const response = await request(app)
      .put("/products/1")
      .send({ name: "Strawberry Jam", price: 99, category: "1" })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const json = JSON.parse(response.text);
    expect(json.price).toBe(99);
  });

  //GET http://localhost:3000/products/1 //show a specific product by id
  it("GET /products/1 //show a specific product by id", async () => {
    const response = await request(app).get("/products/1");
    expect(response.status).toBe(200);
    const json = JSON.parse(response.text);
    expect(json.price).toEqual(jasmine.any(Number));
  });

  //GET http://localhost:3000/products/top // top 5 selling products
  it("GET /products/top // top 5 selling products", async () => {
    const response = await request(app).get("/products/top");
    expect(response.status).toBe(200);
  });

  //GET http://localhost:3000/products/categories //list of all categories
  it("GET /products/categories //list of all categories", async () => {
    const response = await request(app).get("/products/categories");
    expect(response.status).toBe(200);
    const json = JSON.parse(response.text);
    expect(json[0].id).toEqual(jasmine.any(Number));
  });

  //DELETE product
  it("DELETE /products/id Delete a specific product", async () => {
    try {
      const productsC = new BackEndStoreProducts();

      const createdP = await productsC.create({
        name: "Strawberry chocolate",
        price: 99,
        category: 1
      });

      //deleting....
      const response = await request(app)
        .delete("/products/" + createdP.id)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      const json = JSON.parse(response.text);

      expect(json.id).toEqual(createdP.id);
    } catch (error) {
      //do nothing
    }
  });
});
