import supertest from "supertest";
import app from "../../index";

const request = supertest;
const token = process.env.TEST_JWT; //test JWT for endpoints that requires authentication

describe("Supertest Endpoints /orders", function () {
  //POST http://localhost:3000/orders { "user_id": "1"  } //create an order
  it("POST /orders //create a new order", async () => {
    const response = await request(app)
      .post("/orders")
      .send({ user_id: "1" })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const json = JSON.parse(response.text);
    expect(json.status).toEqual("active");
  });

  //POST http://localhost:3000/orders/1 {"product_id" : "1" , "quantity": 5} //add a product to the created order
  it("POST /orders/1 //add a product to the created order", async () => {
    const response = await request(app)
      .post("/orders/1")
      .send({ product_id: "1", quantity: 5 })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const json = JSON.parse(response.text);
    expect(parseInt(json.oid)).toEqual(1);
  });

  //POST http://localhost:3000/orders/1/close complete an order
  it("POST /orders/1/close //complete an order i.e change status to complete", async () => {
    const response = await request(app)
      .post("/orders/1/close")
      .send("")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const json = JSON.parse(response.text);
    expect(json.status).toEqual("complete");
  });

  //GET http://localhost:3000/orders/user/1 //user orders
  it("GET http://localhost:3000/orders/user/1 //user orders without a JWT to return 401", async () => {
    const response = await request(app).get("/orders/user/1");
    expect(response.status).toBe(401);
  });

  //GET http://localhost:3000/orders/user/1 //user orders
  it("GET /orders/user/1 index all orders by a user", async () => {
    const response = await request(app)
      .get("/orders/user/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    const json = JSON.parse(response.text);

    expect(json[0].id).toEqual(jasmine.any(Number));
  });

  //GET http://localhost:3000/orders/user/1/complete //user orders completed
  it("GET /orders/user/1/complete index all completed orders by a user", async () => {
    const response = await request(app)
      .get("/orders/user/1/complete")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    const json = JSON.parse(response.text);

    expect(json[0].status).toEqual("complete");
  });
});
